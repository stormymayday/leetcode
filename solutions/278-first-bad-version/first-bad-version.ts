/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {

    return function(n: number): number {

        let left = 1;
        let right = n;

        // if left === right stop
        while(left < right) {

            const mid = Math.floor((left + right) / 2);

            if(isBadVersion(mid)) {
                // found bad version!
                // discard everything to right (those are all bad)
                // But keep account this one because it might be the first one
                right = mid;
            } else {
                // good version
                // discard everything to the left AND this one
                left = mid + 1;
            }

        }

        // can return either pointer at the end
        return left;
        
    };
};