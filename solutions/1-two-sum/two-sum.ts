function twoSum(nums: number[], target: number): number[] {

    const res: number[] = [];

    const diffMap = new Map<number, number>(); // key: difference / number, value: index

    for(let i = 0; i < nums.length; i += 1) {

        const diff = target - nums[i];

        if(diffMap.has(diff)) {
            res[0] = i;
            res[1] = diffMap.get(diff);
            break;
        }

        diffMap.set(nums[i], i);

    }

    return res;
    
};