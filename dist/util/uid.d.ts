/**
 * Strategy used to generate UIDs.
 */
export type UIDStrategy = "uuidv4" | "ulid" | "nanoid" | "short";
export interface UIDOptions {
    /** For "nanoid": length of the id (default 21) */
    size?: number;
    /** For "nanoid": custom alphabet (default URL-safe) */
    alphabet?: string;
}
/**
 * Generates an RFC4122-compliant UUID v4.
 * Uses `crypto.randomUUID` if available.
 *
 * @returns {string} UUID v4 string.
 */
export declare function uuidv4(): string;
/**
 * Generates a 26-character ULID (time-sortable unique ID).
 *
 * @param {number} [date] - Optional timestamp in milliseconds. Defaults to `Date.now()`.
 * @returns {string} ULID string.
 */
export declare function ulid(date?: number): string;
/**
 * Generates a NanoID-style string.
 *
 * @param {number} [size=21] - Length of the generated ID.
 * @param {string} [alphabet=DEFAULT_ALPHABET] - Alphabet to use.
 * @returns {string} Generated NanoID string.
 */
export declare function nanoid(size?: number, alphabet?: string): string;
export declare function shortId(): string;
/**
 * Generates a UID using the specified strategy.
 *
 * @param {UIDStrategy} [strategy="uuidv4"] - The UID strategy to use.
 * @param {UIDOptions} [opts={}] - Options for the selected strategy.
 * @returns {string} Generated UID.
 */
export declare function generateUID(strategy?: UIDStrategy, opts?: UIDOptions): string;
//# sourceMappingURL=uid.d.ts.map