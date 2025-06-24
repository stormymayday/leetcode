function combine(n: number, k: number): number[][] {
    function helper(start: number, remaining: number, k: number) {
        // Base Case 1: One Combination
        if(k === 0) {
            return [[]];
        }

        // Base Case 1: Zero Combinations
        if(k > remaining) {
            return [];
        }

        // Recursive Call 1: Include current number (start)
        const partialCombos = helper(start + 1, remaining - 1, k - 1);
        const combosWithFirst = [];
        for(const partialCombo of partialCombos) {
            combosWithFirst.push([start, ...partialCombo]);
        }

        // Recursive Call 2: Exclude current number (start)
        const combosWithoutFirst = helper(start + 1, remaining - 1, k);

        // Combine 
        return [...combosWithFirst, ...combosWithoutFirst];

    }
    return helper(1, n, k);
};