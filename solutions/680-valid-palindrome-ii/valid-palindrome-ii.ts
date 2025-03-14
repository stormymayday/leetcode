/**
 * Helper function to check if a substring is a palindrome
 * @param str The input string
 * @param left Starting index of the substring
 * @param right Ending index of the substring
 * @returns Boolean indicating if the substring is a palindrome
 */
function isPalindrome(str: string, left: number, right: number): boolean {
    // Check characters from both ends moving inward
    while(left < right) {
        // If characters don't match, it's not a palindrome
        if(str[left] !== str[right]) {
            return false;
        } else {
            // If characters match, move pointers toward center
            left++;
            right--;
        }
    }
    // If we've checked all characters without finding a mismatch, it's a palindrome
    return true;
}

function validPalindrome(s: string): boolean {
    // Initialize two pointers at the beginning and end of the string
    let left = 0;
    let right = s.length - 1;
    
    // Move pointers inward until we find characters that don't match
    while(left < right) {
        if(s[left] !== s[right]) {
            // When we find a mismatch, we have two options:
            // 1. Skip the character at left pointer (left+1, right)
            // 2. Skip the character at right pointer (left, right-1)
            
            // Check if either option results in a palindrome
            return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
        } else {
            // If characters match, move pointers inward and continue
            left++;
            right--;
        }
    }
    
    // If we completed the loop without finding a mismatch, the string is already a palindrome
    return true;
};