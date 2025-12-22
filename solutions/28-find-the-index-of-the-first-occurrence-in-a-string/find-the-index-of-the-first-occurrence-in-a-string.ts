function strStr(haystack: string, needle: string): number {

    let idx = -1;
    
    let i = 0;
    while(i < haystack.length - needle.length + 1) {

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

        i += 1;

    }

    return idx;

};