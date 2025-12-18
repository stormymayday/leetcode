/**
 Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr: number[]): void {

    const n = arr.length;

    // First Pass: count the number of zeroes
    let numZeroes = 0;
    for(let i = 0; i < n; i += 1){
        if(arr[i] === 0) {
            numZeroes += 1;
        }
            
    }

    if(numZeroes === 0) {
        return;
    }

    // Second Pass:
    let i = n - 1;
    let j = n - 1 + numZeroes;
    while(i >= 0) {

        // if 'i' is at zero
        if(arr[i] === 0) {
            
            // FIRST ZERO
            // 'j' is in bounds
            if(j < n) {
                arr[j] = 0;
                j -= 1;
            } 
            // 'j' is out of bounds
            else {
                j -= 1;
            }

            // SECOND ZERO
            // 'j' is in bounds
            if(j < n) {
                arr[j] = 0;
                j -= 1;
            } 
            // 'j' is out of bounds
            else {
                j -= 1;
            }

        } 
        // 'i' is at non-zero
        else {
            
            // 'j' is in bounds
            if(j < n) {
                arr[j] = arr[i];
                j -= 1;
            } 
            // 'j' is out of bounds
            else {
                j -= 1;
            }

        }

        i -= 1;

    }

    
};