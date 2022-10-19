import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export const ASSET_FILE = path.join(__dirname, 'layer.zip');

// we hash the Dockerfile (it contains the tools versions) because hashing the zip is non-deterministic
export function assetHash() {
  // This could be calculated at build time
  return hashFile(path.join(__dirname, '..', 'layer', 'Dockerfile'));
}

function hashFile(fileName: string) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(fileName))
    .digest('hex');
}