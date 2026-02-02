export function parsePgArray<T extends string>(pgArray: string | null): T[] {
    if (!pgArray) return [];
    // Remove the curly braces and split by comma
    return pgArray
        .slice(1, -1)       // remove { and }
        .split(',')          // split by comma
        .map(s => s.trim())  // remove extra whitespace
        .filter(Boolean) as T[];
}