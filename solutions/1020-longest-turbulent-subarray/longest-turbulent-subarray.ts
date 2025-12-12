function maxTurbulenceSize(arr: number[]): number {

    // Need to start max streak with 1 (1 element)
    let maxStreak = 1;

    let prevCompSign = "";
    let left = 0;
    for (let right = 1; right < arr.length; right += 1) {

        let currCompSign = "";
        let curr = arr[right];
        let prev = arr[right - 1];

        if (prev > curr) {
            currCompSign = ">";
        } else if (prev < curr) {
            currCompSign = "<";
        } else {
            // current sign is "==="
            left = right;
            prevCompSign = "";
            continue;
        }

        // prev and curr comp signs are the same
        if (prevCompSign === currCompSign) {
            left = right - 1;
        }

        // there is no prevCompSign OR signs are different
        maxStreak = Math.max(maxStreak, right - left + 1);

        prevCompSign = currCompSign;

    }

    return maxStreak;
};