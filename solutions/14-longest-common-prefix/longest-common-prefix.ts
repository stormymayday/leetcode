function longestCommonPrefix(strs: string[]): string {
    
    // starting with index 0, this will be the index of the last common character
    let idx = 0;

    // Going through every character of the first string
    // Note: there can be strings shorter than first
    outer: while(idx < strs[0].length) {

        let currChar = strs[0][idx];

        // Going through every string (skipping first)
        for(let i = 1; i < strs.length; i += 1) {

            const currStr = strs[i];
            
            // If current string is too short or characters at this index do not match
            if(currStr.length <= idx || currStr[idx] !== currChar) {
                break outer;
            }

        }

        // char at this index have matched for all strings
        idx += 1;

    }

    return strs[0].substring(0, idx);

};