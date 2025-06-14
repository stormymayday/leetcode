function rob(nums: number[]): number {
    // Handle edge cases
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Helper function for linear House Robber
    function robLinear(nums: number[], start: number, end: number, memo: Record<string, number> = {}): number {
        if (start >= end) return 0;

        const key = start.toString(); // Only `start` is needed since subarray is fixed

        if (key in memo) return memo[key];

        // Rob current house and skip next, or skip current house
        memo[key] = Math.max(
            nums[start] + robLinear(nums, start + 2, end, memo),
            robLinear(nums, start + 1, end, memo)
        );

        return memo[key];
    }

    // Return max of two cases: rob [0, n-2] or [1, n-1]
    return Math.max(
        robLinear(nums, 0, nums.length - 1, {}), // Exclude last house
        robLinear(nums, 1, nums.length, {})      // Exclude first house
    );
}