// Core dHash and Hamming Distance utilities
export function getHammingDistance(hash1: bigint, hash2: bigint): number {
    let xorResult = hash1 ^ hash2;
    let distance = 0;
    
    // Count the number of set bits (differences)
    while (xorResult > 0n) {
        if (xorResult & 1n) {
            distance++;
        }
        xorResult >>= 1n;
    }
    
    return distance;
}

export function areImagesSimilar(hash1: bigint, hash2: bigint, allowedDifferenceBits: number = 5): boolean {
    const distance = getHammingDistance(hash1, hash2);
    return distance <= allowedDifferenceBits;
}

 // Updated threshold rules to handle 99% similarity matching per mentor feedback
