/**
 * This function implements the DJB2 hash algorithm to generate a hash value for a given string.
 * The DJB2 hash algorithm is a simple yet effective string hashing algorithm proposed by Daniel J. Bernstein.
 * It uses a combination of bit shifting and prime number multiplication to achieve a good
 * distribution of hash values for different input strings, which reduces the likelihood of collisions.
 *
 * Time Complexity: O(n). This is because the function iterates over each character in the string
 * exactly once.
 * Space Complexity: O(1). This is because the function only uses a fixed number of variables and
 * does not allocate any additional space that grows with the size of the input string.
 *
 * @param s - The input string for which the hash value is to be calculated.
 * @returns The hash value of the input string as a string.
 */
export function generateDjb2Hash(s: string): string {
	let hash = 5381
	for (const char of s) {
		const charCode = char.charCodeAt(0)
		// eslint-disable-next-line no-bitwise -- DJB2 hash algorithm
		hash = (hash << 5) + hash + charCode /* hash * 33 + c */
	}
	return hash.toString()
}
