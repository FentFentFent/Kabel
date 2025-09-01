export type UIDStrategy = "uuidv4" | "ulid" | "nanoid" | "short";
export interface UIDOptions {
    /** For "nanoid": length of the id (default 21) */
    size?: number;
    /** For "nanoid": custom alphabet (default URL-safe) */
    alphabet?: string;
}
/** RFC4122 UUID v4 (uses crypto.randomUUID if available) */
export declare function uuidv4(): string;
/** ULID: time-sortable, 26 chars */
export declare function ulid(date?: number): string;
export declare function nanoid(size?: number, alphabet?: string): string;
export declare function shortId(): string;
/** One-call wrapper */
export declare function generateUID(strategy?: UIDStrategy, opts?: UIDOptions): string;
//# sourceMappingURL=uid.d.ts.map