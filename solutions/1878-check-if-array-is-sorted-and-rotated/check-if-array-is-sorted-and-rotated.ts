function check(nums: number[]): boolean {

    let pivot = -1;

    for(let i = 0; i < nums.length - 1; i += 1) {
        if(nums[i] > nums[i + 1]) {
            pivot = i;
            break;
        }
    }

    if(pivot === -1) {
        return true;
    }

    const slice1 = nums.slice(0, pivot + 1);
    const slice2 = nums.slice(pivot + 1);
    const candidate = [...slice2, ...slice1];
    for(let i = 0; i < candidate.length - 1; i += 1) {
        if(candidate[i] > candidate[i + 1]) {
            return false;
        }
    }
    return true;
    
};