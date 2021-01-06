/**
 * 1. Import key from raw input (Uint - TextEncoder and encode string into array).
 *    Hash raw input using PBKDF2
 *    Converts Uint array to CryptoKey object.
 * 2. Derive key from CryptoKey object containing imported key.
 * From MozillaDeveloper
 * ```
 *    baseKey is a CryptoKey representing the input to the derivation algorithm.
 *    If algorithm is ECDH, then this will be the ECDH private key.
 *    Otherwise it will be the initial key material for the derivation function:
 *    for example, for PBKDF2 it might be a password, imported as
 *    a CryptoKey using SubtleCrypto.importKey().
 * ```
 * 3. Encrypt
 */

const IV_LEN = 16;

function str2ab(str: string) {
  return new TextEncoder().encode(str);
}

function ab2str(ab: Uint8Array) {
  return new TextDecoder().decode(ab);
}

function importKey(key: string) {
  const baseKey = str2ab(key);
  return window.crypto.subtle.importKey("raw", baseKey, "PBKDF2", false, [
    "deriveKey"
  ]);
}

function deriveKey(key: CryptoKey, salt: Uint8Array) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 10000,
      hash: {
        name: "SHA-512"
      }
    },
    key,
    {
      name: "AES-GCM",
      length: 128
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(content: string, password: string) {
  // Generate IV and salt
  const iv = window.crypto.getRandomValues(new Uint8Array(IV_LEN));
  const salt = window.crypto.getRandomValues(new Uint8Array(IV_LEN));

  // Convert string to Uint8Array
  const data = str2ab(content);

  // Convert string to CryptoKey
  const importedKey = await importKey(password);
  // Generate random key from imported key
  const derivedKey = await deriveKey(importedKey, salt);
  // Returns ArrayBuffer
  const encrypt = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    derivedKey,
    data
  );

  // Convert arraybuffer to Uint8Array
  const encrypted = new Uint8Array(encrypt);
  const abIVData = new Uint8Array(
    new ArrayBuffer(IV_LEN * 2 + encrypted.length)
  );
  abIVData.set(iv);
  abIVData.set(salt, IV_LEN);
  abIVData.set(encrypted, IV_LEN * 2);
  return abIVData;
}

export async function decrypt(encrypted: Uint8Array, password: string) {
  const [iv, salt, data] = [
    encrypted.slice(0, IV_LEN),
    encrypted.slice(IV_LEN, IV_LEN * 2),
    encrypted.slice(IV_LEN * 2)
  ];
  const importedKey = await importKey(password);
  const derivedKey = await deriveKey(importedKey, salt);
  const dec = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv
    },
    derivedKey,
    data
  );

  const decrypted = new Uint8Array(dec);

  return ab2str(decrypted);
}
