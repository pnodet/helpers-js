import crypto from "crypto";

/**
 * @link https://nodejs.org/api/crypto.html#crypto_class_cipher
 * @link https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
 */
export const crypto_decrypt_aes256 = (password, ivenc) => {
  const key = crypto.createHash("sha256").update(password).digest();
  const iv = ivenc.slice(1, ivenc[0] + 1);
  const enc = ivenc.slice(ivenc[0] + 1);
  const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  return Buffer.concat([decipher.update(enc), decipher.final()]);
};

/**
 * @link https://nodejs.org/api/crypto.html#crypto_class_cipher
 * @link https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
 */
export const crypto_encrypt_aes256 = (password, data) => {
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash("sha256").update(password).digest();
  const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);
  if (iv.length > 255) {
    throw new Error("iv size is too big");
  }
  return Buffer.concat([
    Buffer.from([iv.length]),
    iv,
    cipher.update(data),
    cipher.final(),
  ]);
};

/**
 * @param data
 * @returns {Buffer}
 * @link https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/#how-to-calculate-hashes-with-crypto
 */
export const crypto_hash_sha256 = (data) =>
  crypto.createHash("sha256").update(data).digest();
