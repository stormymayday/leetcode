function makesquare(matchsticks: number[]): boolean {

    // Check if total length % 4 is zero
    const totalLength = matchsticks.reduce((acc, curr) => {
        return acc + curr;
    }, 0);
    
    if(totalLength % 4 !== 0) {
        // if the remainder is not zero,
        // we won't be able to divide given matchsticks into 4 equal sizes
        return false;
    }

    // Sort in descending order
    const sorted = matchsticks.sort((a, b) => b - a);
    // Calculate the target side length
    const targetSideLength = totalLength / 4;
    // if largest matchstick is longer than target side length
    if(sorted[0] > targetSideLength) {
        // we can exit early
        return false;
    }

    const sides = new Array(4).fill(0);
    function helper(index: number): boolean {
        // Base Case
        if(index === matchsticks.length) {
            return true;
        }

        for(let j = 0; j < 4; j += 1) {
            // if adding this matchstick does not exceeds target side length
            if(sides[j] + sorted[index] <= targetSideLength) {
                // make a choice to use this matchstick
                sides[j] += sorted[index];
                // recurse
                if(helper(index + 1) === true) {
                    return true;
                }
                // backtrack
                sides[j] -= sorted[index];
            }
        }

        return false;

    }

    return helper(0);

};