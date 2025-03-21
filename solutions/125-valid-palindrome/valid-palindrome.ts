/**
 * Helper function to check if a character is alphanumeric (a-z, A-Z, or 0-9)
 * @param {string} char
 * @return {boolean}
 */
function isAlphanumeric(char: string):boolean {
    return (
        (char >= "a" && char <= "z") || // Check if it's a lowercase letter
        (char >= "A" && char <= "Z") || // Check if it's an uppercase letter
        (char >= "0" && char <= "9") // Check if it's a digit
    );
}

function isPalindrome(s: string): boolean {
    // Initialize two pointers: one at the start (left) and one at the end (right) of the string
    let left = 0;
    let right = s.length - 1;

    // Loop until the two pointers meet
    while (left < right) {
        // If the character at the left pointer is not alphanumeric, move left pointer forward
        if (!isAlphanumeric(s[left])) {
            left++;
            continue; // Skip this iteration and check the next character
        }

        // If the character at the right pointer is not alphanumeric, move right pointer backward
        if (!isAlphanumeric(s[right])) {
            right--;
            continue; // Skip this iteration and check the next character
        }

        // Compare the characters at both pointers (converted to lowercase for case insensitivity)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false; // If characters don’t match, it's not a palindrome
        }

        // If characters match, move both pointers inward to continue checking
        left++;
        right--;
    }

    // If the loop completes without returning false, the string is a palindrome
    return true;
}