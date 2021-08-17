import crypto from "crypto";

/**
 * @link https://nodejs.org/api/crypto.html#crypto_class_cipher
 * @link https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
 */
export const decrypt_aes256 = (password, ivenc) => {
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
export const encrypt_aes256 = (password, data) => {
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
export const hash_sha256 = (data) =>
  crypto.createHash("sha256").update(data).digest();

/** Used to generate unique IDs. */
const idCounter = {}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
export function uniqueId(prefix='$lodash$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0
  }

  const id =++idCounter[prefix]
  if (prefix === '$lodash$') {
    return `${id}`
  }

  return `${prefix}${id}`
}