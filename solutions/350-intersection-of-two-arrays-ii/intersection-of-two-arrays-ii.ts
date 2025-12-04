function intersect(nums1: number[], nums2: number[]): number[] {

    if(nums1.length < nums2.length) {
        // we want 'nums1' to be bigger
        // such that 'visited' array would mirror 'nums2'
        // thus, reducing extra space
        return intersect(nums2, nums1);
    }

    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    const visited = new Array(nums2.length).fill(0);

    const res: number[] = [];

    for(let i = 0; i < nums1.length; i += 1) {

        for(let j = 0; j < nums2.length; j += 1) {

            if(nums1[i] === nums2[j] && visited[j] === 0) {
                res.push(nums1[i]);
                visited[j] = 1;
                break;
            }

            // Sorted Arrays Optimization
            // No point in comparing once value at j becomes greater
            if(nums2[j] > nums1[i]) {
                break;
            }

        }

    }

    return res;

    
};