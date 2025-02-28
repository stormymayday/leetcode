function isAnagram(s: string, t: string): boolean {
    // An anagram is a rearrangement of the exact same characters
    // no more, no less.
    if (s.length !== t.length) {
        return false;
    }

    const hashMap = {};

    // filling the hashmap
    for(let i = 0; i < s.length; i++) {
        // If the character is not in the map
        if(hashMap[s[i]] === undefined) {
            // add the character as a key and set value to 1
            hashMap[s[i]] = 1;
        } else {
            // otherwise, increment the value by 1
            hashMap[s[i]]++;
        }
    }

    for(let i = 0; i < t.length; i++) {
        // if the character is in the map
        if(hashMap[t[i]] !== undefined) {
            // decrement count
            hashMap[t[i]]--;
            // delete the character when count reaches 0
            if(hashMap[t[i]] === 0) {
                delete hashMap[t[i]];
            }
        } else {
            // otherwise, (character is not in the map) return 'false'
            return false;
        }
    }

    return true;
    
};