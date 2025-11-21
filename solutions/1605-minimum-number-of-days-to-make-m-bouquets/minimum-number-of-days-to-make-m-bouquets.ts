function minDays(bloomDay: number[], m: number, k: number): number {
    
    // Edge Case: not enough flowers
    // Note: It seems that flowers don't regrow
    if(bloomDay.length < m * k) {
        // m - number of bouquets
        // k - flowers per boutquet
        // m * k = total number of flowers required
        return - 1;
    }

    let left = Math.min(...bloomDay);
    let right = Math.max(...bloomDay);
    let candidate = -1;
    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        // Phase 1: fill in the 'blooms' array
        // const blooms: boolean[] = [];
        let bouquets = 0;
        let flowers = 0;
        for(let i = 0; i < bloomDay.length; i += 1) {
            if(bloomDay[i] <= mid) {
                // blooms[i] = true;
                flowers += 1;
                if(flowers === k) {
                    bouquets += 1;
                    flowers = 0;
                }
            } else {
                // blooms[i] = false;
                flowers = 0;
            }
        }

        // Phase 2: scan the 'blooms' array
        // let bouquets = 0;
        // let flowers = 0;
        // for(let i = 0; i < bloomDay.length; i += 1) {
        //     if(blooms[i] === true) {
        //         flowers += 1;
        //         if(flowers === k) {
        //             bouquets += 1;
        //             flowers = 0;
        //         }
        //     } else {
        //         flowers = 0;
        //     }
        // }

        // Phase 3: Binary Search Logic
        // We have enough bouquets        
        if(bouquets >= m) {
            // candidate
            candidate = mid;
            right = mid - 1; // try less days
        } 
        // not enough bouquets
        else {
            left = mid + 1;
        }
    }

    return candidate;

};