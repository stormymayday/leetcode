function findMedianSortedArrays(nums1: number[], nums2: number[]): number {

    let A = nums1;
    let B = nums2;

    const totalLength = A.length + B.length;
    const half = Math.floor(totalLength/2);

    if(A.length > B.length) {
        const temp = A;
        A = B;
        B = temp;
    }

    let left = 0;
    let right = A.length - 1;
    while(true) {

        const Amid = Math.floor((left+right)/2);
        const Bmid = half - (Amid + 1) - 1;

        const Aleft = Amid >= 0 ? A[Amid] : -Infinity;
        const Aright = Amid + 1 < A.length ? A[Amid + 1] : Infinity;

        const Bleft = Bmid >= 0 ? B[Bmid] : -Infinity;
        const Bright = Bmid + 1 < B.length ? B[Bmid + 1] : Infinity;

        if(Aleft <= Bright && Bleft <= Aright) {
            // Even
            if(totalLength % 2 === 0) {
                return (Math.max(Aleft, Bleft)+Math.min(Aright, Bright))/2;
            }
            // Odd
            else {
                return Math.min(Aright, Bright);
            }
        } else if(Aleft > Bright) {
            right = Amid - 1;
        } else {
            // Bleft > Aright
            left = Amid + 1;
        }

    }
    
};