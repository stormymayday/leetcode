/**
 * class ArrayReader {
 *		// This is the ArrayReader's API interface.
 *		// You should not implement it, or speculate about its implementation
 *		get(index: number): number {};
 *  };
 */

function search(reader: ArrayReader, target: number): number {

    let left: number = 0;
    let right: number = 10000;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);
        const midVal = reader.get(mid);

        if(target > midVal) {
            left = mid + 1;
        } else if(target < midVal) {
            right = mid - 1;
        } else {
            return mid;
        }

    }

    return -1;

};