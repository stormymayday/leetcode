/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {

    let count = k;

    while(count > 0) {

        let el = nums.pop();
        nums.unshift(el);

        count--;
    }
    
};