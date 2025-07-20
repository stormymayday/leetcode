function makesquare(matchsticks: number[]): boolean {
    const totaLength = matchsticks.reduce((acc, curr) => acc + curr, 0);
    if(totaLength % 4 !== 0) {
        return false;
    }
    const sorted = matchsticks.sort((a, b) => b - a);
    const sideLength = totaLength / 4;
    if(sorted[0] > sideLength) {
        return false;
    }
    const sides = new Array(4).fill(0);
    function helper(index: number): boolean {
        if(index === sorted.length) {
            return true;
        }

        for(let i = 0; i < 4; i += 1) {
            if(sides[i] + sorted[index] <= sideLength) {
                sides[i] += sorted[index];
                if(helper(index + 1) === true) {
                    return true;
                }
                sides[i] -= sorted[index];
            }
        }

        return false;
    }
    return helper(0);
};