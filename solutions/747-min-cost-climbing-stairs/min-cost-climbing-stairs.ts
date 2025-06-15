function minCostClimbingStairs(cost: number[]): number {
    const memo: Record<number, number> = {};
    const index0 = helper(cost, 0, memo);
    const index1 = helper(cost, 1, memo);
    return Math.min(index0, index1);
};

function helper(cost: number[], i: number, memo: Record<number, number>):number {
    if(i in memo) {
        return memo[i];
    }

    if(i > cost.length) {
        return Infinity;
    }

    if(i === cost.length) {
        return 0;
    }

    memo[i] = cost[i] + Math.min(helper(cost, i + 1, memo), helper(cost, i + 2, memo));

    return memo[i];
}