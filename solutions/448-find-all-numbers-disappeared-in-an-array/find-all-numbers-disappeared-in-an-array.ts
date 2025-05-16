function findDisappearedNumbers(nums: number[]): number[] {

    const hashSet = new Set();

    for(let i = 1; i <= nums.length; i++) {
        hashSet.add(i);
    }

    for(const num of nums) {
        hashSet.delete(num);
    }

    return Array.from(hashSet) as number[];
    
};