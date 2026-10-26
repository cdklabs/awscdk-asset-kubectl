#!/bin/bash
# Updates the kubectl and helm versions bundled in this branch's layer to the
# newest releases that support this branch's Kubernetes minor version.
#
# - kubectl: the latest patch of 1.<SPEC_VERSION>, read from dl.k8s.io.
# - helm: the newest stable release of the SAME major version as today whose
#   go.mod is built against client-go v0.<SPEC_VERSION> to v0.<SPEC_VERSION+3>.
#   Helm supports the Kubernetes minor it was built against and the three
#   before it (https://helm.sh/docs/topics/version_skew/), so for example a
#   Helm built against client-go v0.37 supports Kubernetes 1.34 to 1.37.
#
# Run from the repository root. Needs curl, gh (authenticated) and base64.
# Writes changed=true|false, kubectl=<version> and helm=<version> to
# $GITHUB_OUTPUT when it is set.
set -euo pipefail

SPEC_VERSION=$(sed -nE "s/^const SPEC_VERSION = '([0-9]+)';/\1/p" .projenrc.ts)
if [ -z "$SPEC_VERSION" ]; then
  echo "Could not read SPEC_VERSION from .projenrc.ts" >&2
  exit 1
fi

CURRENT_KUBECTL=$(sed -nE 's/^ARG KUBECTL_VERSION=([0-9.]+).*/\1/p' layer/Dockerfile)
CURRENT_HELM=$(sed -nE 's/^ARG HELM_VERSION=([0-9.]+).*/\1/p' layer/Dockerfile)
HELM_MAJOR=${CURRENT_HELM%%.*}

# kubectl: latest patch release of this minor
NEW_KUBECTL=$(curl -sfL "https://dl.k8s.io/release/stable-1.${SPEC_VERSION}.txt" | sed 's/^v//')
if [[ ! "$NEW_KUBECTL" =~ ^1\.${SPEC_VERSION}\.[0-9]+$ ]]; then
  echo "kubectl 1.${SPEC_VERSION} is not released yet" >&2
  exit 1
fi

# helm: newest stable release of the same major built for a supported client-go
NEW_HELM=""
TAGS=$(gh api "repos/helm/helm/releases?per_page=50" \
  --jq '.[] | select(.prerelease | not) | .tag_name' \
  | grep -E "^v${HELM_MAJOR}\.[0-9]+\.[0-9]+$" | sort -Vr)
for tag in $TAGS; do
  client_go_minor=$(gh api "repos/helm/helm/contents/go.mod?ref=${tag}" --jq .content \
    | base64 -d | awk '$1 == "k8s.io/client-go" { print $2 }' | cut -d. -f2)
  if [ -n "$client_go_minor" ] \
    && [ "$client_go_minor" -ge "$SPEC_VERSION" ] \
    && [ "$client_go_minor" -le $((SPEC_VERSION + 3)) ]; then
    NEW_HELM=${tag#v}
    break
  fi
done
if [ -z "$NEW_HELM" ]; then
  echo "No helm v${HELM_MAJOR} release supports Kubernetes 1.${SPEC_VERSION}" >&2
  exit 1
fi

echo "kubectl: ${CURRENT_KUBECTL} -> ${NEW_KUBECTL}"
echo "helm:    ${CURRENT_HELM} -> ${NEW_HELM}"

changed=false
if [ "$NEW_KUBECTL" != "$CURRENT_KUBECTL" ] || [ "$NEW_HELM" != "$CURRENT_HELM" ]; then
  changed=true
  # The Dockerfile is the source of the layer. The README, the layer description
  # and its unit test repeat the versions as text.
  sed -i.bak -E \
    -e "s/^ARG KUBECTL_VERSION=.*/ARG KUBECTL_VERSION=${NEW_KUBECTL}/" \
    -e "s/^ARG HELM_VERSION=.*/ARG HELM_VERSION=${NEW_HELM}/" \
    layer/Dockerfile
  sed -i.bak -E \
    -e "s/^> - Kubectl Version: .*/> - Kubectl Version: ${NEW_KUBECTL}/" \
    -e "s/^> - Helm Version: .*/> - Helm Version: ${NEW_HELM}/" \
    README.md
  sed -i.bak -E \
    "s#/opt/kubectl/kubectl [0-9.]+; /opt/helm/helm [0-9.]+#/opt/kubectl/kubectl ${NEW_KUBECTL}; /opt/helm/helm ${NEW_HELM}#" \
    src/kubectl-layer.ts test/kubectl-layer.test.ts
  rm -f layer/Dockerfile.bak README.md.bak src/kubectl-layer.ts.bak test/kubectl-layer.test.ts.bak
fi

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  {
    echo "changed=${changed}"
    echo "kubectl=${NEW_KUBECTL}"
    echo "helm=${NEW_HELM}"
  } >> "$GITHUB_OUTPUT"
fi
