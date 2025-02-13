function maximumSubarraySum(nums: number[], k: number): number {

    let result = 0;

    if(!nums.length) {
        return result;
    }

    const freqMap = {};
    let numberOfUniqueValues = 0;
    let left = 0;
    let windowSum = 0;

    for(let right = 0; right < nums.length; right++) {

        windowSum += nums[right];
        if(!freqMap[nums[right]]) {
            freqMap[nums[right]] = 1;
            numberOfUniqueValues++;
        } else {
            freqMap[nums[right]]++;
        }

        if(right - left + 1 > k) {
            windowSum -= nums[left];

            freqMap[nums[left]]--;

            if(freqMap[nums[left]] === 0) {
                delete freqMap[nums[left]];
                numberOfUniqueValues--;
            }

            left++;

        }

        if(right - left + 1 === k && numberOfUniqueValues === k) {
            result = Math.max(result, windowSum);
        }

    }
    
    return result;

};