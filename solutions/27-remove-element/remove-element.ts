function removeElement(nums: number[], val: number): number {

    let write = 0;

    for(let read = 0; read < nums.length; read += 1) {

        if(nums[read] !== val) {
            nums[write] = nums[read];
            write += 1;
        }

    }

    return write;
    
};