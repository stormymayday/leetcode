function twoSum(numbers: number[], target: number): number[] {

    const n = numbers.length;

    // Outer loop: linear scan every number (can skip the last one)
    for(let i = 0; i < n - 1; i += 1) {
        
         // Binary Search for other half (diff)
        const diff = target - numbers[i];
        let left = i + 1;
        let right = n - 1;
        while(left <= right) {

            const mid = left + Math.floor((right - left) / 2);

            // target is greater than mid, go right
            if(diff > numbers[mid]) {
                left = mid + 1;
            } else if(diff < numbers[mid]) {
                right = mid - 1;
            } else {
                return [i + 1, mid + 1];
            }

        }

    }

    return [-1, -1];

};