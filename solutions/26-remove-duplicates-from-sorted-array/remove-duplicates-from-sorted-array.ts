function removeDuplicates(nums: number[]): number {

    let k = nums.length;

    let i = 1;
    while(i < k) { // Outer: O(n)

        // "Looking back" while prev is a duplicate of curr
        // AND i is less than k!
        while(i < k && nums[i - 1] === nums[i]) { // Middle: O(n) worst case

            // Shift All values to the left replacing 'curr'
            for(let j = i; j < k - 1; j += 1) { // Inner: O(n) per shift
                nums[j] = nums[j + 1];
            }

            k -= 1;

        }

        i += 1;

    }

    return k;
    
};