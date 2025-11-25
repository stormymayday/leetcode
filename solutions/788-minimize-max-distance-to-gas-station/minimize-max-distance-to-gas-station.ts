function minmaxGasDist(stations: number[], k: number): number {

    // 1. Find the biggest 'gap' between the gas stations
    let maxGap = 0;
    for (let i = 0; i < stations.length - 1; i += 1) {
        const currGap = stations[i + 1] - stations[i];
        if (maxGap < currGap) {
            maxGap = currGap;
        }
    }

    // We set left at zero, because the minimum possible penalty is 0
    // (stations could theoretically be infinitely close)
    let left = 0;
    // We set right at max gap, because the worst case penalty
    // is when we don't reduce the largest gap at all
    let right = maxGap;

    // Continue binary search until the range is smaller than 0.000001
    // 1e-6 === 0.000001 or 1 × 10⁻⁶
    while (right - left > 1e-6) {

        // IMPORTANT: Don't use Math.floor for continuous values!
        // We're searching in the space of real numbers, not integers
        const mid = (left + right) / 2;
        // const mid = left + Math.floor((right - left) / 2);  // Wrong for decimals!

        // Calculate how many stations we'd need to achieve this gap
        const numberOfGasStations = countStationsNeeded(mid, stations);
        
        if (numberOfGasStations > k) {
            // Not possible with k stations, why?
            // Because mid is TOO SMALL (trying for too tight of a gap)
            // We need MORE stations than we have available
            // So we need to INCREASE our target gap (search right half)
            left = mid;
        } else {
            // Possible with k or fewer stations, why?
            // Because mid is achievable (or even easier than needed)
            // This is a potential candidate
            // But let's see if we can do BETTER (smaller gap)
            // So search the left half
            right = mid;
        }
    }

    // At convergence, left ≈ right (within 1e-6)
    // Either left or right works as the answer
    return left;  // or return right, they're essentially the same
}

// Helper function: Count how many stations needed to achieve targetGap
function countStationsNeeded(targetGap: number, stations: number[]): number {
    let stationsNeeded = 0;
    
    for (let i = 0; i < stations.length - 1; i += 1) {
        const gap = stations[i + 1] - stations[i];
        
        // How many stations do we need to add to this gap
        // to make all segments ≤ targetGap?
        // Example: gap = 12, targetGap = 5
        // We need floor(12/5) = 2 stations to split into 3 segments
        stationsNeeded += Math.floor(gap / targetGap);
    }
    
    return stationsNeeded;
}