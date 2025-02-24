function getDigit(num, i) {
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

function digitCount(num) {
    if(num === 0) {
        return 1;
    }
     return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
    let max = 0;
    for(let i = 0; i < nums.length; i++) {
        let currentValueDigitCount = digitCount(nums[i]);
        if(currentValueDigitCount > max) {
            max = currentValueDigitCount;
        }
    }
    return max;
}

function sortArray(nums: number[]): number[] {
    // Separate negative and positive numbers
    const negatives = nums.filter(n => n < 0).map(n => Math.abs(n));
    const positives = nums.filter(n => n >= 0);
    
    // Sort positive numbers
    let maxDigitCount = mostDigits(positives);
    for (let k = 0; k < maxDigitCount; k++) {
        const digitBuckets = Array.from({length: 10}, () => []);
        
        for (let i = 0; i < positives.length; i++) {
            const digit = getDigit(positives[i], k);
            digitBuckets[digit].push(positives[i]);
        }
        
        positives.length = 0;
        digitBuckets.forEach(bucket => positives.push(...bucket));
    }
    
    // Sort negative numbers
    maxDigitCount = mostDigits(negatives);
    for (let k = 0; k < maxDigitCount; k++) {
        const digitBuckets = Array.from({length: 10}, () => []);
        
        for (let i = 0; i < negatives.length; i++) {
            const digit = getDigit(negatives[i], k);
            digitBuckets[digit].push(negatives[i]);
        }
        
        negatives.length = 0;
        digitBuckets.forEach(bucket => negatives.push(...bucket));
    }
    
    // Combine results: reversed negatives (made negative again) + positives
    return [...negatives.reverse().map(n => -n), ...positives];
};