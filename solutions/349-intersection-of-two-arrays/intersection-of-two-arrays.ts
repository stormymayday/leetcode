function intersection(nums1: number[], nums2: number[]): number[] {

    // Create a hash set out of one of the arrays
    const hashSet = new Set(nums1);

    const result = [];
    // Iterate over the second array
    for(let i = 0; i < nums2.length; i++) {

        const currentNum = nums2[i];

        // check if currentNum is in the set
        if(hashSet.has(currentNum)) {

            // If it is, add it to the result
            result.push(currentNum);

            // delete it from the set
            hashSet.delete(currentNum);

        }

    }

    return result;
    
};