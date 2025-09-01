// uid.ts
// Tiny UID toolkit – no deps. Tabs > spaces, obviously.

export type UIDStrategy = "uuidv4" | "ulid" | "nanoid" | "short";

export interface UIDOptions {
    /** For "nanoid": length of the id (default 21) */
    size?: number;
    /** For "nanoid": custom alphabet (default URL-safe) */
    alphabet?: string;
}

/** Web Crypto shim (browser + Node 16+) */
const cryptoAPI: Crypto | null =
    (typeof globalThis !== "undefined" && (globalThis as any).crypto) || null;

/** Random bytes helper */
function randBytes(len: number): Uint8Array {
    if (cryptoAPI?.getRandomValues) {
        const buf = new Uint8Array(len);
        cryptoAPI.getRandomValues(buf);
        return buf;
    }
    // Last resort (very old envs). Not cryptographically strong.
    const buf = new Uint8Array(len);
    for (let i = 0; i < len; i++) buf[i] = Math.floor(Math.random() * 256);
    return buf;
}

/** RFC4122 UUID v4 (uses crypto.randomUUID if available) */
export function uuidv4(): string {
    const g: any = globalThis as any;
    if (g?.crypto?.randomUUID) return g.crypto.randomUUID();

    const b = randBytes(16);
    // Per RFC: set version + variant bits
    // @ts-ignore
    b[6] = (b[6] & 0x0f) | 0x40;
    // @ts-ignore
    b[8] = (b[8] & 0x3f) | 0x80;

    const hex: string[] = [];
    for (let i = 0; i < 256; i++) hex.push(i.toString(16).padStart(2, "0"));

    return (
        // @ts-ignore
        hex[b[0]] + hex[b[1]] + hex[b[2]] + hex[b[3]] + "-" +
        // @ts-ignore
        hex[b[4]] + hex[b[5]] + "-" +
        // @ts-ignore
        hex[b[6]] + hex[b[7]] + "-" +
        // @ts-ignore
        hex[b[8]] + hex[b[9]] + "-" +
        // @ts-ignore
        hex[b[10]] + hex[b[11]] + hex[b[12]] + hex[b[13]] + hex[b[14]] + hex[b[15]]
    );
}

/** Crockford Base32 alphabet for ULID */
const CROCK32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // no I L O U

/** ULID: time-sortable, 26 chars */
export function ulid(date?: number): string {
    const time = (typeof date === "number" ? date : Date.now()) >>> 0; // low 32 bits
    const timeHi = Math.floor((typeof date === "number" ? date : Date.now()) / 0x100000000) >>> 0; // high 32
    // ULID uses 48-bit time; do base32 encode 48 bits
    const time48 = new Uint8Array(6);
    // write 48-bit big-endian
    let t = BigInt(typeof date === "number" ? date : Date.now());
    for (let i = 5; i >= 0; i--) {
        time48[i] = Number(t & 0xffn);
        t >>= 8n;
    }
    // first 10 chars = time
    let out = "";
    let acc = 0;
    let bits = 0;
    for (let i = 0; i < 6; i++) {
        // @ts-ignore
        acc = (acc << 8) | time48[i];
        bits += 8;
        while (bits >= 5) {
            bits -= 5;
            out += CROCK32[(acc >>> bits) & 31];
        }
    }
    if (bits > 0) out += CROCK32[(acc << (5 - bits)) & 31];
    out = out.slice(0, 10);

    // last 16 chars = randomness (80 bits)
    const rnd = randBytes(10);
    acc = 0; bits = 0;
    for (let i = 0; i < rnd.length; i++) {
        // @ts-ignore
        acc = (acc << 8) | rnd[i];
        bits += 8;
        while (bits >= 5) {
            bits -= 5;
            out += CROCK32[(acc >>> bits) & 31];
        }
    }
    if (bits > 0) out += CROCK32[(acc << (5 - bits)) & 31];

    return out.slice(0, 26);
}

/** NanoID-style: URL-safe alphabet by default, configurable length/alphabet */
const DEFAULT_ALPHABET =
    "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function nanoid(size: number = 21, alphabet: string = DEFAULT_ALPHABET): string {
    if (size <= 0) throw new Error("size must be > 0");
    const mask = (1 << Math.ceil(Math.log2(alphabet.length))) - 1;
    let id = "";
    while (id.length < size) {
        const bytes = randBytes(1);
        // @ts-ignore
        const idx = bytes[0] & mask;
        if (idx < alphabet.length) id += alphabet[idx];
    }
    return id;
}

/** Short, mostly-unique (not crypto-strong): timestamp base36 + counter + random */
let _ctr = 0;
export function shortId(): string {
    const ts = Date.now().toString(36);
    _ctr = (_ctr + 1) & 0xfff; // 0..4095
    const c = _ctr.toString(36).padStart(3, "0");
    const r = Array.from(randBytes(3))
        .map(b => (b & 0x3f).toString(36).padStart(2, "0"))
        .join("")
        .slice(0, 4);
    return `${ts}${c}${r}`;
}

/** One-call wrapper */
export function generateUID(strategy: UIDStrategy = "uuidv4", opts: UIDOptions = {}): string {
    switch (strategy) {
        case "uuidv4": return uuidv4();
        case "ulid": return ulid();
        case "nanoid": return nanoid(opts.size ?? 21, opts.alphabet ?? DEFAULT_ALPHABET);
        case "short": return shortId();
        default: {
            const _exhaustive: never = strategy;
            return uuidv4();
        }
    }
}
