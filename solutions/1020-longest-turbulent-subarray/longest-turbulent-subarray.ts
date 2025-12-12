function maxTurbulenceSize(arr: number[]): number {
    
    // Need to start max streak with 1 (1 element)
    let maxStreak = 1;

    for (let i = 0; i < arr.length; i += 1) {

        let prevCompSign = "";

        for (let j = i + 1; j < arr.length; j += 1) {

            let currCompSign = "";

            let curr = arr[j];
            let prev = arr[j - 1];

            if (prev > curr) {
                currCompSign = ">";
            } else if (prev < curr) {
                currCompSign = "<";
            } else {
                // current sign is "==="
                break;
            }

            // prev and curr comp signs are the same
            if (prevCompSign === currCompSign) {
                prevCompSign = currCompSign;
                break;
            }

            // there is no prevCompSign OR signs are different
            maxStreak = Math.max(maxStreak, j - i + 1);
            prevCompSign = currCompSign;

        }

    }

    return maxStreak;
};