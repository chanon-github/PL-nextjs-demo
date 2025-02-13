
export const reverseKeyValue = (original: any): any => {
    let reversed: any = {};
    for (const key in original) {
        reversed[original[key]] = key;
    }
    return reversed;
}