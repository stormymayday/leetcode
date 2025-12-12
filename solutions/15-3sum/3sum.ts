function threeSum(nums: number[]): number[][] {

    const n = nums.length;

        const sorted = [...nums].sort((a, b) => a - b);

        const res = [];

        for(let left = 0; left < n - 2; left += 1) {

            if(left > 0 && sorted[left] === sorted[left - 1]) {
                continue;
            }

            let mid = left + 1;
            let right = n - 1;
            while(mid < right) {

                const sum = sorted[left] + sorted[mid] + sorted[right];

                if(sum === 0) {

                    res.push([sorted[left], sorted[mid], sorted[right]]);

                    mid += 1;
                    while(mid < right && sorted[mid] === sorted[mid - 1]) {
                        mid += 1;
                    }

                    right -= 1;
                    while(mid < right && sorted[right] === sorted[right + 1]) {
                        right -= 1;
                    }

                } else if(sum > 0) {
                    right -= 1;
                } 
                // sum < 0
                else {
                    mid += 1;
                }

            }

        }

        return res;

};