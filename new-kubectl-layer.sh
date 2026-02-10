#!/bin/bash
# First argument should be kubectl version we're bumping to
# Second argument should be helm version we're bumping to
set -euo pipefail

PREV_KUBECTL_VERSION=$(echo "$1 - 1" | bc)
PREV_HELM_VERSION=$(echo "$2 - 1" | bc)

echo "Before running this script, please ensure you have signed in and have valid AWS credentials, and that your Docker daemon is running."
read -p "Do you have valid credentials in your account && Docker daemon is running?  (Y/n)" hasValidCreds
if [[ "$hasValidCreds" =~ ^[nN]$ ]]; then
  echo "Please obtain valid AWS credentials before running this script. Terminating..."
  exit 1
fi

# Check if previous version branch exists
if ! git rev-parse --verify "kubectl-v$PREV_KUBECTL_VERSION/main" >/dev/null 2>&1; then
  echo "Error: kubectl-v$PREV_KUBECTL_VERSION does not exist. Cannot produce kubectl-v$1"
  exit 1
fi

# Check if kubectl version exists
echo "Checking if kubectl v$1 exists..."
if ! curl -L -f -s "https://dl.k8s.io/v1.$1.0/bin/linux/amd64/kubectl" > /dev/null; then
  echo "Error: kubectl v$1 does not exist at https://dl.k8s.io"
  exit 1
fi
echo "It does!"

# Check if corresponding helm version exists
echo "Checking if Helm v$2 exists..."
if ! curl -L -f -s "https://get.helm.sh/helm-v3.$2.0-linux-amd64.tar.gz" > /dev/null; then
  echo "Error: Helm v$2 does not exist at https://dl.k8s.io"
  exit 1
fi
echo "It does!"

echo "Bumping from Kubectl v$PREV_KUBECTL_VERSION to Kubectl v$1..."
git clean -fqdx .

# Install dependencies
yarn install --frozen-lockfile

# Make a new branch and clean it
git checkout -b kubectl-v${1}/main kubectl-v$PREV_KUBECTL_VERSION/main

# Define files to update
files=(
  "README.md"
  "layer/Dockerfile"
  "src/kubectl-layer.ts"
  "test/kubectl-layer.test.ts"
  "test/kubectl-layer.integ.ts"
)

# Define patterns and replacements
patterns=(
  "s/1.$PREV_KUBECTL_VERSION\.[0-9]/1.$1.0/g"
  "s/3.$PREV_HELM_VERSION\.[0-9]/3.$2.0/g"
  "s/KubectlV${PREV_KUBECTL_VERSION}Layer/KubectlV${1}Layer/g"
  "s/KubeCtl v1.$PREV_KUBECTL_VERSION/KubeCtl v1.$1/"  # this one only in README.md
)

# Update .projenrc.ts
echo "Updating .projenrc.ts..."
sed -i "" "s/SPEC_VERSION = '$PREV_KUBECTL_VERSION'/SPEC_VERSION = '$1'/" .projenrc.ts

# Update the other files
for file in "${files[@]}"; do
  echo "Updating $file..."
  for pattern in "${patterns[@]}"; do
    sed -i "" "$pattern" "$file"
  done
done

echo "All files updated."

# Run npx projen commands and ensure everything properly builds
echo "Compiling..."
npx projen compile
echo "Running npx projen..."
npx projen
echo "Building..."
npx projen pre-compile
echo "Deploying integ test..."
if ! yes | npx projen integ:kubectl-layer:deploy; then
  echo "Command failed, but continuing script execution..."  # May fail due to notices, as "destroy" doesn't use --no-notices
fi
echo "Checking that the snapshot was updated..."
if ! npx projen integ:kubectl-layer:assert; then
  echo "It was not. Updating now..."
  npx projen integ:kubectl-layer:snapshot
fi
echo "Verifying build..."
if ! yarn build; then
  echo "The build has failed. Please review the error messages above and determine if it is due to your local environment."
  read -p "A PR will be created. Please ensure the 'build' test on that passes before merging. Press enter to continue."
fi

# Remind user to make a new branch in go library as well
echo "Please visit $(tput setaf 3)https://github.com/cdklabs/awscdk-asset-kubectl/branches$(tput sgr0) and create a new branch titled '$(tput setaf 3)kubectl-v$1/main$(tput sgr0)'."
read -p "Press Enter to continue..."

echo "Please visit $(tput setaf 3)https://github.com/cdklabs/awscdk-kubectl-go/branches$(tput sgr0) and create a new branch titled '$(tput setaf 3)kubectl.$1$(tput sgr0)'."
read -p "Press Enter to continue..."

# Commit changes and push PR
git add .
git commit -m "feat: support v1.$1"
git push origin kubectl-v${1}/main
echo "=========="
echo "Please visit the link above and open your pull request. Ensure the PR passes all stages of execution and all tests pass."
echo "Take caution that you are targeting the correct upstream branch (kubectl-v$1/main). Please also ensure one other engineer approves of the changes before merging in."
echo "⚠️ATTENTION⚠️ when the new version merges in, UPDATE THE REPOSITORY'S DEFAULT BRANCH TO THAT VERSION (kubectl-v$1/main)."
echo "Thank you for your contribution!"
