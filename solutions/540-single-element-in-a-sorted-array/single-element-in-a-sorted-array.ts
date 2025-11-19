function singleNonDuplicate(nums: number[]): number {

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        // Exit condition
        if (
            // If 'mid - 1' goes out of bounds OR value at 'mid' is not equal to value at 'mid - 1'
            (mid - 1 < 0 || nums[mid] !== nums[mid - 1]) &&
            // AND
            // If 'mid + 1' goes out of bounds OR value at 'mid' is not equal to value at 'mid + 1'
            (mid + 1 === nums.length || nums[mid] !== nums[mid + 1])
        ) {
            return nums[mid];
        }

        // Figure out lengths of each (can do just one) side (minus mid(s))
        let leftSideSize = 0;
        // Side with an odd length will have the 'single element'
        // If mid's duplicate is to it's left
        if (nums[mid - 1] === nums[mid]) {
            leftSideSize = mid - 2 - left + 1;
        }
        // Otherwise, mid's duplicte must be to it's right
        else {
            leftSideSize = mid - 1 - left + 1;
        }

        // left has even length, single element is on the right
        if (leftSideSize % 2 === 0) {
            // If mid's duplicate is to it's left
            if (nums[mid - 1] === nums[mid]) {
                left = mid + 1;
            }
            // Otherwise, mid's duplicte must be to it's right
            else {
                left = mid + 2;
            }
        }
        // left has odd length, single element is on the left
        else {
            // If mid's duplicate is to it's left
            if (nums[mid - 1] === nums[mid]) {
                right = mid - 2;
            }
            // Otherwise, mid's duplicte must be to it's right
            else {
                right = mid - 1;
            }
        }

    }

};