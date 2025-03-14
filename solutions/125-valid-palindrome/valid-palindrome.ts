function isPalindrome(s: string): boolean {
    // First, clean the string by removing non-alphanumeric characters and converting to lowercase
    s = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    
    // Initialize pointers for center-outward approach
    let left = 0;
    let right = 0;
    
    // Set pointer positions based on string length
    if(s.length % 2 === 0) {
        // For even-length strings, place pointers on the middle two characters
        left = s.length/2 - 1;    // Left of center
        right = s.length/2;       // Right of center
    } else {
        // For odd-length strings, place both pointers at the middle character
        // The first comparison will be with the character itself (always true)
        // Then the algorithm will expand outward
        left = Math.floor(s.length/2);
        right = Math.floor(s.length/2);
    }
    
    // Expand outward from the center, comparing characters
    while (left >= 0 && right < s.length) {
        // If characters at mirrored positions don't match, it's not a palindrome
        if (s[left] !== s[right]) {
            return false;
        } else {
            // Move pointers outward in both directions
            left--;
            right++;
        }
    }
    
    // If all character comparisons matched, the string is a palindrome
    return true;
}