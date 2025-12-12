function fourSum(nums: number[], target: number): number[][] {
    
    const n = nums.length;

    const sorted = [...nums].sort((a, b) => a - b);

    const res = [];

    for (let i = 0; i < n - 3; i += 1) {

        if (i > 0 && sorted[i] === sorted[i - 1]) {
            continue;
        }

        for (let j = i + 1; j < n - 2; j += 1) {

            if (j > i + 1 && sorted[j] === sorted[j - 1]) {
                continue;
            }

            let k = j + 1;
            let l = n - 1;
            while (k < l) {

                const sum = sorted[i] + sorted[j] + sorted[k] + sorted[l];

                if (sum > target) {
                    l -= 1;
                } else if (sum < target) {
                    k += 1;
                } else {
                    res.push([sorted[i], sorted[j], sorted[k], sorted[l]]);
                    k += 1;
                    while (k < l && sorted[k] === sorted[k - 1]) {
                        k += 1;
                    }
                    l -= 1;
                    while (k < l && sorted[l] === sorted[l + 1]) {
                        l -= 1;
                    }

                }

            }

        }
    }

    return res;
};