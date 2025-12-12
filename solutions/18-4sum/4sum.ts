function fourSum(nums: number[], target: number): number[][] {

    const n = nums.length;

    nums.sort((a, b) => a - b);

    const res = [];

    for (let i = 0; i < n - 3; i += 1) {

        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        for (let j = i + 1; j < n - 2; j += 1) {

            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            for (let k = j + 1; k < n - 1; k += 1) {

                if (k > j + 1 && nums[k] === nums[k - 1]) {
                    continue;
                }

                for (let l = k + 1; l < n; l += 1) {

                    if (l > k + 1 && nums[l] === nums[l - 1]) {
                        continue;
                    }

                    if (nums[i] + nums[j] + nums[k] + nums[l] === target) {

                        res.push([nums[i], nums[j], nums[k], nums[l]]);

                    }

                }

            }

        }

    }

    return res;

};