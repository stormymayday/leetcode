/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {

    return function(n: number): number {
        
        // Brute Force
        // for(let i = 1; i <= n; i += 1) {
        //     if(isBadVersion(i) === true) {
        //         return i;
        //     }
        // }

        // Binary Search on Range
        let left: number = 0;
        let right: number = n;
        let candidate: number = 0;

        while(left <= right) {

            const mid = left + Math.floor((right - left) / 2);

            const response = isBadVersion(mid);

            // this is a 'bad' version
            if(response === true) {
                // this is a potential candidate!
                candidate = mid;
                // everything to the right of 'mid' must also be 'bad'
                // therefore, discard right side
                right = mid - 1;
            } 
            // this is a 'good' version
            else {
                // everything to the left of 'mid' must also be 'good'
                // therefore, discard 'left'
                left = mid + 1;
            }

        }
        
        return candidate;

    };
};