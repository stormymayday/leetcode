function subsetsWithDup(nums: number[]): number[][] {
    const sorted = nums.sort((a,b) => a - b);
    const result = [];
    const curSet = [];
    function helper(index) {

        if(index === sorted.length) {
            result.push([...curSet]);
            return;
        }

        // include
        curSet.push(sorted[index]);
        helper(index + 1);

        // backtrack
        curSet.pop();

        // exclude
        while(index + 1 < sorted.length && sorted[index] === sorted[index + 1]) {
            index += 1;
        }
        helper(index + 1);

    }
    helper(0);
    return result;
};