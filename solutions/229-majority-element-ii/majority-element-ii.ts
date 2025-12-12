function majorityElement(nums: number[]): number[] {

    const n = nums.length;

    let el1 = -Infinity;
    let count1 = 0;
    let el2 = -Infinity;
    let count2 = 0;

    for(let i = 0; i < n; i += 1) {

        if(count1 === 0 && nums[i] !== el2) {
            el1 = nums[i];
            count1 = 1;
        } else if(count2 === 0 && nums[i] !== el1) {
            el2 = nums[i];
            count2 = 1;
        } else if(nums[i] === el1) {
            count1 += 1;
        } else if(nums[i] === el2) {
            count2 += 1;
        } else {
            count1 -= 1;
            count2 -= 1;
        }

    }

    const res: number[] = [];
    const majority: number = Math.floor(n / 3);
    count1 = 0;
    count2 = 0;
    for(let i = 0; i < n; i += 1) {
        if(nums[i] === el1) {
            count1 += 1;
        }
        if(nums[i] === el2) {
            count2 += 1;
        }
    }

    if(count1 > majority) {
        res.push(el1);
    }
    if(count2 > majority) {
        res.push(el2);
    }
    
    return res;
    
};