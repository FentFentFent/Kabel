
export default function hasProp(obj: object, name: string) {
    return Object.prototype.hasOwnProperty.call(obj, name)
}