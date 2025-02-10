function containsDuplicate(nums: number[]): boolean {
    
    const mySet = new Set(nums);

    return mySet.size !== nums.length;

};