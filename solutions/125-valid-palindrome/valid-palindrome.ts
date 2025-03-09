function isPalindrome(s: string): boolean {
    // Preprocess the string: remove non-alphanumeric characters and convert to lowercase
    s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    // recursive helper function
    function helper(left, right) {
        // Base case: if pointers have crossed, it's a palindrome
        if(left >= right) {
            return true;
        }
        // If chars don't match it's not a palindrome
        if(s[left] !== s[right]) {
            // Early exit
            return false;
        } else {
            // Otherwise, move pointers towards the center and continue checking
            return helper(left + 1, right - 1);
        }
    }
    
    // Start recursion with the first and last indices of the processed string
    return helper(0, s.length - 1);
};