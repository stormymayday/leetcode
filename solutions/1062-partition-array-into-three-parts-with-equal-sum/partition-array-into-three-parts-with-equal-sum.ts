function canThreePartsEqualSum(arr: number[]): boolean {

    const total = arr.reduce((acc, curr) => acc + curr, 0);

    if(total % 3 !== 0) {
        return false;
    }

    const target = total / 3;
    
    let prefixSum = 0;
    let count = 0;

    // To ensure three non-empty parts, stop scanning at arr.length - 1:
    for(let i = 0; i < arr.length - 1; i += 1) {
        prefixSum += arr[i];
        if(prefixSum === target) {
            count += 1;
            prefixSum = 0;
        }
    }

    return count >= 2;
};