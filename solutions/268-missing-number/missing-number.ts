function missingNumber(nums: number[]): number {
    
    const sorted: number[] = [...nums].sort((a, b) => a - b);

    let missingNum = -Infinity;

    for(let i = 0; i < sorted.length; i += 1) {
        if(i !== sorted[i]) {
            missingNum = i;
            break;
        }
    }

    return missingNum === -Infinity ? nums.length : missingNum;

};