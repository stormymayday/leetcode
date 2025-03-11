/**
 * Processes a string by handling backspaces (represented by '#')
 * @param str The input string to process
 * @returns An array of characters representing the final string after processing backspaces
 */
function removePoundSign(str: string): string[] {
    const result = [];
    for(let i = 0; i < str.length; i++) {
        if(str[i] !== '#') {
            // If current character is not a backspace, add it to the result
            result.push(str[i]);
        } else {
            // If current character is a backspace, remove the last character
            result.pop();
        }
    }
    return result;
}

function backspaceCompare(s: string, t: string): boolean {
    // Process both strings to handle backspaces
    const arrS = removePoundSign(s);
    const arrT = removePoundSign(t);

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