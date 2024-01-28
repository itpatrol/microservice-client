/**
 * Generate hash Signature for request
 */

/**
 * Create unique hash for object.
 *
 * @param {object} data - object to create sha256.
 * @param {string} secret - object to create sha.
 *
 * @returns {string} return signature string.
 */
export default async function(data, secret) {
  const enc = new TextEncoder();
  const body = data;
  const algorithm = { name: "HMAC", hash: "SHA-256" };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    algorithm,
    false,
    ["sign", "verify"]
  );

  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(body)
  );

  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(signature));

  // convert bytes to hex string
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
