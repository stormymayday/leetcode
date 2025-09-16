function findJudge(n: number, trust: number[][]): number {

    // 1. Build in-degree and out-degree hash maps
    const inDegreeMap = new Map<number, number>();
    const outDegreeMap = new Map<number, number>();
    for (let i = 1; i <= n; i += 1) {
        inDegreeMap.set(i, 0);
        outDegreeMap.set(i, 0);
    }
    for (const [src, dst] of trust) {
        inDegreeMap.set(dst, inDegreeMap.get(dst) + 1);
        outDegreeMap.set(src, outDegreeMap.get(src) + 1);
    }

    // 2. Iterate over the nodes and check if there is a node that satisfies the constraints
    let judge = -1;
    for (let i = 1; i <= n; i += 1) {
        if (
            // must have an in-degree of n-1 (everyone must trust the judge)
            inDegreeMap.get(i) === n - 1 &&
            // must have an out-degree of 0 (judge trusts no one)
            outDegreeMap.get(i) === 0
        ) {
            // If a node satifies both constraints, then it must be the judge
            judge = i;
            break;
        }
    }
    return judge;
};