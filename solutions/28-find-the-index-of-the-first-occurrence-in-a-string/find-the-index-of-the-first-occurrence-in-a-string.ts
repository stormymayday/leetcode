function strStr(haystack: string, needle: string): number {

    let idx = -1;
    
    for(let i = 0; i < haystack.length - needle.length + 1; i += 1) {

        if(haystack[i] === needle[0]) {
            
            let match = true;
            for(let j = 1; j < needle.length; j += 1) {

                if(haystack[i + j] !== needle[j]) {
                    match = false;
                    break;
                }

            }
            if(match === true) {
                idx = i;
                break;
            }

        }

    }

    return idx;

};