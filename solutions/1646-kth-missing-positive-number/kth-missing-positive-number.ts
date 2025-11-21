function findKthPositive(arr: number[], k: number): number {

    for(let i = 0;  i < arr.length; i += 1) {
        if(arr[i] <= k) {
            k += 1;
        } else {
            break;
        }
    }

    return k;
};