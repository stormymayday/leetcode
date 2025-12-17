/**
 Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr: number[]): void {

    const n = arr.length;
    
    let i = 0;
    while(i < n) {

        if(arr[i] === 0) {
            // Starting 'j' at second to last index
            let j = n - 2;
            // Going towards 'i'
            while(j >= i) {
                // Shifting all elements to the right
                arr[j + 1] = arr[j]
                j -= 1;
            }
            // Need to skip duplicated zero
            i += 2;
        } else {
            i += 1;
        }
    }
 
};