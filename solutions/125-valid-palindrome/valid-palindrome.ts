function isPalindrome(s: string): boolean {
    // Step 1: Clean the string by removing non-alphanumeric characters
    // and convert it to lowercase to make it case-insensitive.
    let cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLocaleLowerCase();

    // Step 2: Define a helper function to recursively check if the string is a palindrome.
    function helper(left, right) {
        // Base case: If left index is greater than right, it means we have checked all characters
        // and confirmed that the string is a palindrome.
        if (left > right) {
            return true;
        }

        // If characters at left and right indices do not match, return false.
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }

        // Recursively check the next pair of characters (moving towards the center).
        return helper(left + 1, right - 1);
    }

    // Step 3: Start the recursion with the initial left and right indices.
    return helper(0, cleanStr.length - 1);
}