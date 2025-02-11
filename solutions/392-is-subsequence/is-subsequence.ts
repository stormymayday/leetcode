function isSubsequence(s: string, t: string): boolean {

    if(s.length > t.length) {
        return false;
    }

    if(!s.length) {
        return true;
    }

    let i = 0;

    for(let j = 0; j < t.length; j++) {

        if(s[i] === t[j]) {
            i++;
            if(i === s.length) {
                return true;
            }
        }

    }

    return false;
    
};