/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _Crypto.uniqueId('contact_')
 * // => 'contact_104'
 *
 * _Crypto.uniqueId()
 * // => '105'
 */
export function uniqueId(prefix?: string): string;
export function decryptAes256(password: any, ivenc: any): Buffer;
export function encryptAes256(password: any, data: any): Buffer;
export function hashSha256(data: any): Buffer;
