function fourSum(nums: number[], target: number): number[][] {

    const n = nums.length;

    nums.sort((a, b) => a - b);

    const res = new Set<string>();

    for (let i = 0; i < n; i += 1) {

        for (let j = i + 1; j < n; j += 1) {

            const kSet = new Set<number>();

            for (let k = j + 1; k < n; k += 1) {

                const diff = target - (nums[i] + nums[j] + nums[k]);

                if (kSet.has(diff)) {
                    res.add(JSON.stringify([nums[i], nums[j], nums[k], diff]));
                }

                kSet.add(nums[k]);

            }

        }

    }

    return Array.from(res).map((quadruplet) => JSON.parse(quadruplet));

};