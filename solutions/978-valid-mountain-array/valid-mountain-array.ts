function validMountainArray(arr: number[]): boolean {

    if(arr.length < 3) {
        return false;
    }

    let left = 1;
    let right = arr.length - 2;

    while (left <= right) {

        if (arr[left - 1] >= arr[left]) {
            return false;
        }

        if (arr[right] <= arr[right + 1]) {
            return false;
        }

        if(arr[left + 1] > arr[left]) {
            left += 1;
        } else if(arr[right - 1] > arr[right]) {
            right -= 1;
        } else {
            left += 1;
            right -= 1;
        }

    }

    return true;

};