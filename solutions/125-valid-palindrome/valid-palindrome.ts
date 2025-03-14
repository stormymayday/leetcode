function isPalindrome(s: string): boolean {
    // Remove all non-alphanumeric characters and convert to lowercase
    s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Initialize two pointers: 
    // 'left' starts at the beginning, 'right' starts at the end.
    let left = 0;
    let right = s.length - 1;

    // Loop until the two pointers meet in the middle.
    while (left < right) {
        // Compare characters at left and right pointers
        if (s[left] !== s[right]) {
            return false; // If they don't match, it's not a palindrome.
        } else {
            // Move both pointers towards the center
            left++;
            right--;
        }
        
    }

    // If all character comparisons matched, the string is a palindrome.
    return true;
}
