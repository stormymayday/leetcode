function findDifference(nums1: number[], nums2: number[]): number[][] {

    // Create sets to get rid of the duplicates
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    // for numbers that are not present in set2
    const notInSet2 = [];

    // Iterate over set1
    for(const num of set1) {
        // If num is not present in the set2
        if(!set2.has(num)) {
            notInSet2.push(num); // push it
        }
        // Otherwise
        else {
            set2.delete(num); // delete it from set2
        }
    }

    // return the notInSet2 array as first item
    // and whatever is left in set2 as the second array
    return [notInSet2, Array.from(set2)];
    
};