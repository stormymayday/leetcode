function makesquare(matchsticks: number[]): boolean {
    // 1. Get total length of all matchsticks
    const totalLength = matchsticks.reduce((acc, curr) => acc + curr, 0);
    // 2. Check if total lenght is evenly divible by 4
    if(totalLength % 4 !== 0) {
        return false;
    }
    // 3. Calculate length of a side
    const sideLength = totalLength / 4;
    // 4. Sort the matchsticks in descending order
    const sorted = matchsticks.sort((a, b) => b - a);
    // 5. Check if the largest matchstick longer than sideLength
    if(sorted[0] > sideLength) {
        return false;
    }
    // 6. Sides array
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