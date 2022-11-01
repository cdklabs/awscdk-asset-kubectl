import * as crypto from 'crypto';
import * as fs from 'fs';

export function hashFile(fileName: string) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(fileName))
    .digest('hex');
}