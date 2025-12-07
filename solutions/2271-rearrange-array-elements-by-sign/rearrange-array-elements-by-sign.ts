function rearrangeArray(nums: number[]): number[] {

    const res: number[] = new Array(nums.length);

    let p1 = 0;
    let p2 = 1;

    for (let i = 0; i < nums.length; i += 1) {
        if (nums[i] < 0) {
            res[p2] = nums[i];
            // p2 = p2 * 2 + 1;
            p2 += 2;
        } else {
            res[p1] = nums[i];
            // if(p1 === 0) {
            //     p1 = 2;
            // } else {
                // p1 = p1 * 2;
                p1 += 2;
            // }   
        }
    }
    
    return res;
};