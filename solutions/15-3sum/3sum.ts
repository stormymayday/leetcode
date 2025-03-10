function threeSum(nums: number[]): number[][] {

    nums.sort((a,b) => a - b);

    const frequencyMap = new Map();
    for(const num of nums) {
        if(frequencyMap.get(num) === undefined) {
            frequencyMap.set(num, 1);
        } else {
            frequencyMap.set(num, frequencyMap.get(num) + 1);
        }
    }

    const result = [];
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i];
        frequencyMap.set(num, frequencyMap.get(num) - 1);
        if(i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        for(let j = i + 1; j < nums.length; j++) {
            const num = nums[j];
            frequencyMap.set(num, frequencyMap.get(num) - 1);
            if(j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            const target = -(nums[i] + nums[j]);
            if(frequencyMap.get(target) > 0) {
                result.push([nums[i], nums[j], target]);
            }
        }

        for (let j = i + 1; j < nums.length; j++) {
            frequencyMap.set(nums[j], frequencyMap.get(nums[j]) + 1);
        }

    }
    
    return result;
    
};