function findDuplicates(nums: number[]): number[] {

    let result = [];

    const hashSet = new Set();

    for(const num of nums) {

        if(hashSet.has(num)) {
            result.push(num);
        } else {
            hashSet.add(num);
        }

    }

    return result;
    
};