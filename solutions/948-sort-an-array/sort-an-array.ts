function sortArray(nums: number[]): number[] {
    return split(nums);
};

function merge(arr1: number[], arr2: number[]): number[] {

    const res: number[] = [];

    let p1 = 0;
    let p2 = 0;

    while(p1 < arr1.length && p2 < arr2.length) {
        if(arr1[p1] <= arr2[p2]) {
            res.push(arr1[p1]);
            p1 += 1;
        } else {
            res.push(arr2[p2]);
            p2 += 1;
        }
    }

    while(p1 < arr1.length) {
        res.push(arr1[p1]);
        p1 += 1;
    }

    while(p2 < arr2.length) {
        res.push(arr2[p2]);
        p2 += 1;
    }

    return res;

}

function split(arr: number[]): number[] {

    if(arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(split(left), split(right));

}