function numberOfSubstrings(s: string): number {
    
    const lastSeenIdx = new Map<string, number>();

    let count = 0;
    // let left = 0;
    for(let right = 0; right < s.length; right += 1) {

        lastSeenIdx.set(s[right], right);

        if(lastSeenIdx.has("a") && lastSeenIdx.has("b") && lastSeenIdx.has("c")) {

            count += Math.min(...lastSeenIdx.values()) + 1;

        }

    }

    return count;

};