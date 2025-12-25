function isAnagram(s: string, t: string): boolean {

    if(s.length !== t.length) {
        return false;
    }

    const letters: number[] = new Array(26).fill(0);

    for(let i = 0; i < s.length; i += 1) {
        const idx = s[i].charCodeAt(0) - 'a'.charCodeAt(0);
        letters[idx] += 1;
    }

    for(let i = 0; i < t.length; i += 1) {
        const idx = t[i].charCodeAt(0) - 'a'.charCodeAt(0);
        if(letters[idx] === 0) {
            return false;
        }
        letters[idx] -= 1;
    }

    return true;
    
};