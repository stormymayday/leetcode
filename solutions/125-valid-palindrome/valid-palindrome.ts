/**
 * Helper function to check if a character is alphanumeric (a-z, A-Z, or 0-9)
 * @param {string} char
 * @return {boolean}
 */
function isAlphanumeric(char) {
    return (
        (char >= "a" && char <= "z") || // Check if it's a lowercase letter
        (char >= "A" && char <= "Z") || // Check if it's an uppercase letter
        (char >= "0" && char <= "9") // Check if it's a digit
    );
}
function isPalindrome(s: string): boolean {
    // Step 1: Create an array to store only alphanumeric characters in lowercase.
    // Using an array is more efficient than concatenating a string
    // because string concatenation (`+=`) creates a new string each time,
    // resulting in O(n^2) complexity. Arrays, on the other hand, allow
    // efficient appending in O(1) time.
    let cleanStr = [];

    // Step 2: Iterate through the string and filter out non-alphanumeric characters.
    for (let i = 0; i < s.length; i++) {
        const currentChar = s[i];
        if (isAlphanumeric(currentChar)) {
            cleanStr.push(currentChar.toLowerCase()); // Convert to lowercase for case insensitivity
        }
    }

    // Step 3: Check if the processed array forms a palindrome.
    // `.reverse()` creates a reversed copy of the array and `.join("")` converts it to a string.
    // We compare this with the original string version to determine if it's a palindrome.
    return cleanStr.join("") === cleanStr.reverse().join("");
}