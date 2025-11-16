/**
 * class ArrayReader {
 *		// This is the ArrayReader's API interface.
 *		// You should not implement it, or speculate about its implementation
 *		get(index: number): number {};
 *  };
 */

function search(reader: ArrayReader, target: number): number {

    // Phase 1: find range
    let left: number = 0;
    let right: number = 1; // if 'right' starts at 0 it won't multiply by 2

    // Note: if 'right' goes out of bounds it returns a very large number
    while (target > reader.get(right)) {
        left = right;
        right = right * 2;
    }

    // Phase 2: Binary Search (if range exists)
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const midVal = reader.get(mid);
        if (target > midVal) {
            left = mid + 1;
        } else if (target < midVal) {
            right = mid - 1;
        } else {
            return mid;
        }
    }

    return -1;

};