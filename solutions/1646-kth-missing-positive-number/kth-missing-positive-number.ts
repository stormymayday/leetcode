function findKthPositive(arr: number[], k: number): number {
    
    let left = 0;
    let right = arr.length - 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        const numberMissingAtCurrentIndex = arr[mid] - (mid + 1);

        if(numberMissingAtCurrentIndex >= k) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }

    }

    return left + k;
};