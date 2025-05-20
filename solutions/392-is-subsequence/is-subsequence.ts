function isSubsequence(s: string, t: string): boolean {

    // Edge Case 1: 's' is longer than 't'
    if(s.length > t.length) {
        return false;
    }

    // Edge Case 2: 's' is empty
    if(s.length === 0) {
        return true;
    }

    let i = 0; // for 's'
    let j = 0; // for 't'

    while(j < t.length) {
        
        // if characters are equal, inrement 'i'
        if(s[i] === t[j]) {
            i++;
            // check if 'i' is equal to length of 's'
            if(i === s.length) {
                // early return
                return true;
            }
        }

        // always increment 'j'
        j++;

    }

    return false;
    
};