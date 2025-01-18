function firstUniqChar(s: string): number {
    
    const hashMap = {};

    for(let i = 0; i < s.length; i++) {
        if(!hashMap[s[i]]) {
            hashMap[s[i]] = 1;
        } else {
            hashMap[s[i]]++;
        }
    }

    for(let i = 0; i < s.length; i++) {
        if(hashMap[s[i]] === 1) {
            return i
        }
    }

    return -1;
};