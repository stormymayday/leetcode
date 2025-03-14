function validPalindrome(s: string): boolean {
    // Initialize two pointers at the beginning and end of the string
    let left = 0;
    let right = s.length - 1;
    
    // Move pointers inward until we find characters that don't match
    while(left < right) {
        if(s[left] !== s[right]) {
            // When we find a mismatch, break out of the loop
            // At this point, left and right point to the mismatching characters
            break;
        } else {
            // If characters match, move pointers inward and continue
            left++;
            right--;
        }
    }
    
    // If we completed the loop without breaking, left >= right, meaning the string is already a palindrome
    if(left >= right) {
        return true;
    }

    // If the loop broke early, we need to check two possibilities:
    // Possibility 1: Skip the character at left position
    // Create a substring that excludes the character at the left pointer
    let s1 = s.slice(left + 1, right + 1);
    
    // Possibility 2: Skip the character at right position
    // Create a substring that excludes the character at the right pointer
    let s2 = s.slice(left, right);
    
    // Check if either resulting substring is a palindrome
    // A string is a palindrome if it equals its reverse
    return (s1 === s1.split("").reverse().join("")) || (s2 === s2.split("").reverse().join(""));
}