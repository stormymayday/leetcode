function swap(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partitionZeroes(arr: number[], left: number, right: number): number {
    let swapIdx = left;

    for (let i = left; i <= right; i++) {
        if (arr[i] !== 0) {
            swap(arr, i, swapIdx);
            swapIdx++;
        }
    }
    return swapIdx;
}

function moveZeroes(nums: number[], left = 0, right = nums.length - 1): void {
    if (left < right) {
        partitionZeroes(nums, left, right);
    }
}