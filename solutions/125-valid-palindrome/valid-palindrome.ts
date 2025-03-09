/**
 * Checks if a character is alphanumeric (a-z, A-Z, 0-9)
 * This function determines if a character falls within the ASCII ranges for letters and numbers
 * @param char - Single character to check
 * @returns true if the character is a letter or digit, false otherwise
 */
function isAlphanumeric(char: string): boolean {
    return (char >= "a" && char <= "z") ||  // Check if char is lowercase letter
           (char >= "A" && char <= "Z") ||  // Check if char is uppercase letter
           (char >= "0" && char <= "9");    // Check if char is a digit
}

function isPalindrome(s: string): boolean {
    // Initialize two pointers - one at the start and one at the end of the string
    let left = 0;
    let right = s.length - 1;
    
    // Continue checking until the pointers meet in the middle
    while(left < right) {
        // Skip non-alphanumeric characters on the left side
        if(!isAlphanumeric(s[left])) {
            left++;
            continue;  // Continue to next iteration without executing code below
        } 

        // Skip non-alphanumeric characters on the right side
        if(!isAlphanumeric(s[right])) {
            right--;
            continue;  // Continue to next iteration without executing code below
        }

        // Compare characters (ignoring case) from both ends
        if(s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;  // Not a palindrome if characters don't match
        } else {
            // Move both pointers inward for next comparison
            left++;
            right--;
        }
    }

    // If we've checked all characters without finding a mismatch, it's a palindrome
    return true;
}