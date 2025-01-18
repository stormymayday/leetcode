function firstUniqChar(s: string): number {
    
    const hashMap = {};

    for(let i = 0; i < s.length; i++) {
        if(!hashMap[s[i]]) {
            hashMap[s[i]] = 1;
        } else {
            hashMap[s[i]]++;
        }
    }

    let firstUniqueCharIndex = -1;
    for(let i = 0; i < s.length; i++) {
        if(hashMap[s[i]] === 1) {
            firstUniqueCharIndex = i;
            break;
        }
    }

    return firstUniqueCharIndex;
};