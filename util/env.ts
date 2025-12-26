const isNode = typeof process !== 'undefined' && !!process.versions?.node;
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
const isWebWorker = typeof self !== 'undefined' && typeof self.importScripts === 'function';

const env: {
    isBrowser: boolean;
    isNode: boolean;
    isWebWorker: boolean;
} = { isNode, isBrowser, isWebWorker };

export default env;