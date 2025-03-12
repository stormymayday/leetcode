/**
 * Finds the next valid character in a string, skipping characters that would be deleted by backspaces
 * @param str The input string to process
 * @param index The starting index to search from (moving backwards)
 * @returns The index of the next valid character, or -1 if no valid character exists
 */
function nextValidChar(str: string, index: number): number {
    let backspaces = 0;
    while(index >= 0) {
        // If we have no backspaces and current char is not a backspace, we found a valid character
        if(backspaces === 0 && str[index] !== '#') {
            break;
        } else if(str[index] === '#') {
            // If we encounter a backspace, increment the counter
            backspaces++;
        } else {
            // If we encounter a normal character with backspaces remaining, "delete" it
            backspaces--;
        }
        // Move to the previous character
        index--;
    }
    return index;
}

function backspaceCompare(s: string, t: string): boolean {
    // Initialize pointers at the end of both strings
    let p1 = s.length - 1;
    let p2 = t.length - 1;

    while(p1 >= 0 || p2 >= 0) {
        // Find the next valid character in each string
        p1 = nextValidChar(s, p1);
        p2 = nextValidChar(t, p2);

        // Get the characters at these positions, or empty string if out of bounds
        let charS = p1 >= 0 ? s[p1] : "";
        let charT = p2 >= 0 ? t[p2] : "";

        // If characters don't match, strings are not equal
        if(charS !== charT) {
            return false;
        }

        // Move to the next positions
        p1--;
        p2--;
    }

    // If we've processed both strings completely without finding a mismatch,
    // they are equal after applying backspaces
    return true;
};