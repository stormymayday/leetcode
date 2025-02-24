function getDigit(num: number, position: number): number {
    return Math.floor(Math.abs(num) / Math.pow(10, position)) % 10;
}

function countDigits(num: number): number {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function findMaxDigits(nums: number[]): number {
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        const digitCount = countDigits(nums[i]);
        if (digitCount > maxDigits) {
            maxDigits = digitCount;
        }
    }
    return maxDigits;
}

function separateNumbers(nums: number[]): [number[], number[]] {
    const positives: number[] = [];
    const negatives: number[] = [];
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            negatives[negatives.length] = Math.abs(nums[i]);
        } else {
            positives[positives.length] = nums[i];
        }
    }
    
    return [positives, negatives];
}

function createBuckets(): number[][] {
    const buckets: number[][] = [];
    for (let i = 0; i < 10; i++) {
        buckets[i] = [];
    }
    return buckets;
}

function flattenBuckets(buckets: number[][]): number[] {
    const result: number[] = [];
    for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            result[result.length] = buckets[i][j];
        }
    }
    return result;
}

function sortArrayByDigit(nums: number[], position: number): number[] {
    const buckets = createBuckets();
    
    // Distribute numbers into buckets
    for (let i = 0; i < nums.length; i++) {
        const digit = getDigit(nums[i], position);
        buckets[digit][buckets[digit].length] = nums[i];
    }
    
    return flattenBuckets(buckets);
}

function sortArray(nums: number[]): number[] {
    // Handle empty or single-element array
    if (nums.length <= 1) return nums;
    
    // Separate positive and negative numbers
    const [positives, negatives] = separateNumbers(nums);
    
    // Sort positive numbers
    let maxDigits = findMaxDigits(positives);
    for (let k = 0; k < maxDigits; k++) {
        const sorted = sortArrayByDigit(positives, k);
        for (let i = 0; i < sorted.length; i++) {
            positives[i] = sorted[i];
        }
    }
    
    // Sort negative numbers
    maxDigits = findMaxDigits(negatives);
    for (let k = 0; k < maxDigits; k++) {
        const sorted = sortArrayByDigit(negatives, k);
        for (let i = 0; i < sorted.length; i++) {
            negatives[i] = sorted[i];
        }
    }
    
    // Combine results: reversed negatives (made negative) + positives
    const result: number[] = [];
    
    // Add reversed negatives
    for (let i = negatives.length - 1; i >= 0; i--) {
        result[result.length] = -negatives[i];
    }
    
    // Add positives
    for (let i = 0; i < positives.length; i++) {
        result[result.length] = positives[i];
    }
    
    return result;
}