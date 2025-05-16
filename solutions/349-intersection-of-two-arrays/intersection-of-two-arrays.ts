function intersection(nums1: number[], nums2: number[]): number[] {

    // Create hashMap out of the first array
    const hashMap1 = {};
    for(const num of nums1) {
        if(!(num in hashMap1)) {
            hashMap1[num] = true;
        }
    }

    // Create hashMap out of the second array
    const hashMap2 = {};
    for(const num of nums2) {
        if(!(num in hashMap2)) {
            hashMap2[num] = true;
        }
    }
    
    // Iterate over either map and check if key exists in the other map
    const result = [];
    for(const key in hashMap1) {
        if(key in hashMap2) {
            result.push(parseInt(key));
        }
    }
    return result;
};