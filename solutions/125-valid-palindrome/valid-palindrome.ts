/**
 * Helper function to check if a character is alphanumeric (a-z, A-Z, or 0-9)
 * @param {string} char
 * @return {boolean}
 */
function isAlphanumeric(char: string): boolean {
    // This function checks if a character is alphanumeric, i.e., a letter or a digit.
    return (
        (char >= "a" && char <= "z") || // Check if it's a lowercase letter.
        (char >= "A" && char <= "Z") || // Check if it's an uppercase letter.
        (char >= "0" && char <= "9") // Check if it's a digit.
    );
}

function isPalindrome(s: string): boolean {
    // Step 1: Create an array to store alphanumeric characters in lowercase.
    const cleanStr = [];

    // Step 2: Loop through the string `s` to extract alphanumeric characters.
    // Only lowercase alphabetic and numeric characters are considered.
    for (let i = 0; i < s.length; i++) {
        const currentChar = s[i];
        // Add the lowercase of the alphanumeric characters to the `cleanStr` array.
        if (isAlphanumeric(currentChar)) {
            cleanStr.push(currentChar.toLowerCase());
        }
    }

    // Step 3: Define the helper function for the recursive palindrome check.
    function helper(left, right) {
        // Base Case: If `left` exceeds `right`, it means we've checked all relevant characters,
        // and the string is a palindrome. Return `true`.
        if (left > right) {
            return true;
        }

        // Step 4: If characters at the `left` and `right` indices don't match, return `false`.
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }

        // Step 5: Recursively check the next pair of characters.
        // Move inward by incrementing `left` and decrementing `right`.
        return helper(left + 1, right - 1);
    }

    // Step 6: Call the helper function with the initial `left` and `right` indices.
    return helper(0, cleanStr.length - 1);
}