function tribonacci(n: number): number {

    if(n === 1 || n === 2) {
        return 1;
    }

    if(n === 0) {
        return 0;
    }

    const nums = [0, 1, 1];
    let i = 3;
    while(i <= n) {
        const temp2 = nums[2];
        nums[2] = nums[2] + nums[1] + nums[0];
        const temp1 = nums[1];
        nums[1] = temp2;
        nums[0] = temp1
        i += 1;
    }

    return nums[2];
};