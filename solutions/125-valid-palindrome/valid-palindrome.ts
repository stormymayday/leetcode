/**
 * Checks if a character is alphanumeric (a-z, 0-9)
 * This simplified version only checks for lowercase letters and digits
 * since we'll convert the string to lowercase before filtering
 * @param char - The character to check
 * @returns True if the character is alphanumeric, false otherwise
 */
function isAlphanumeric(char: string): boolean {
    return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
}

function isPalindrome(s: string): boolean {
    // 1. Convert to lowercase for case-insensitive comparison
    // 2. Convert string to array of characters
    // 3. Filter out non-alphanumeric characters and convert to lowercase
    // 4. Join back to string
    const newStr = s
        .toLowerCase()
        .split("")
        .filter((char) => {
            return isAlphanumeric(char);
        })
        .join("");

    // 5: Compare the filtered string with its reverse
    return newStr === newStr.split("").reverse().join("");
}