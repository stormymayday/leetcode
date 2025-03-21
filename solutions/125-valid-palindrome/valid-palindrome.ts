function isPalindrome(s: string): boolean {
    // Step 1: Clean the input string
    // Remove all non-alphanumeric characters and convert to lowercase
    const cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Step 2: Initialize two pointers
    let left = 0;
    let right = cleanStr.length - 1;

    // Step 3: Check for palindrome using the two-pointer technique
    while (left < right) {
        // If characters at left and right pointers don't match, it's not a palindrome
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++; // Move left pointer forward
        right--; // Move right pointer backward
    }

    // If we finish the loop without mismatches, it's a palindrome
    return true;
};