function backspaceCompare(s: string, t: string): boolean {
    // Arrays to store characters after processing backspaces
    const arrS = [];
    const arrT = [];

    // Process string 's'
    for(let i = 0; i < s.length; i++) {
        if(s[i] !== '#') {
            // If current character is not a backspace, add it to the array
            arrS.push(s[i]);
        } else {
            // If current character is a backspace, remove the last character
            arrS.pop();
        }
    }

    // Process string 't'
    for(let i = 0; i < t.length; i++) {
        if(t[i] !== '#') {
            // If current character is not a backspace, add it to the array
            arrT.push(t[i]);
        } else {
            // If current character is a backspace, remove the last character
            arrT.pop();
        }
    }

    // If the resulting arrays have different lengths, they can't be equal
    if(arrS.length !== arrT.length) {
        return false;
    }

    // Compare each character in both arrays
    for(let i = 0; i < arrS.length; i++) {
        if(arrS[i] !== arrT[i]) {
            // If any characters differ, the strings are not equal
            return false;
        }
    }

    // If we've made it here, the strings are equal after processing backspaces
    return true;
};