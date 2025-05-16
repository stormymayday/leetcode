function findDisappearedNumbers(nums: number[]): number[] {
    
    const hashMap = {};
    for(let i = 1; i <= nums.length; i++) {
        hashMap[i] = 0;
    }

    for(const num of nums) {
        hashMap[num]++;
    }

    const result = [];
    for(const key in hashMap) {
        if(hashMap[key] === 0) {
            result.push(parseInt(key));
        }
    }

    return result;

};