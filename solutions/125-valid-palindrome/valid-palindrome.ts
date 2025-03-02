function isPalindrome(s: string): boolean {
    // Preprocess the string: remove non-alphanumeric characters and convert to lowercase
    s = s.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Define a recursive helper function
    function checkPalindrome(left, right) {
        // Base case: if pointers have crossed, it's a palindrome
        if (left >= right) return true;

        // If characters at the pointers don't match, it's not a palindrome
        if (s[left] !== s[right]) return false;

        // Move pointers towards the center and continue checking
        return checkPalindrome(left + 1, right - 1);
    }

    // Start recursion with the first and last indices of the processed string
    return checkPalindrome(0, s.length - 1);
}
