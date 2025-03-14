function isAlphanumeric(char: string): boolean {
    // This function checks if a character is alphanumeric (a-z, A-Z, or 0-9).
    return (
        (char >= 'a' && char <= 'z') || 
        (char >= 'A' && char <= 'Z') ||
        (char >= '0' && char <= '9')
    );
}

function isPalindrome(s: string): boolean {
    // Initialize two pointers: 
    // 'left' starts at the beginning of the string, 
    // 'right' starts at the end.
    let left = 0;
    let right = s.length - 1;

    // Loop until the two pointers meet in the middle.
    while (left < right) {
        // If the left character is not alphanumeric, skip it and move the pointer forward.
        if (!isAlphanumeric(s[left])) {
            left++;
            // Skip further checks and start the next iteration.
            continue;
        }

        // If the right character is not alphanumeric, skip it and move the pointer backward.
        if (!isAlphanumeric(s[right])) {
            right--;
            // Skip further checks and start the next iteration.
            continue;
        }

        // Compare characters after converting both to lowercase for case insensitivity.
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            // If characters don't match, it's not a palindrome.
            return false;
        }

        // Move both pointers toward the center.
        left++;
        right--;
    }

    // If we reach here, all character comparisons matched, meaning the string is a palindrome.
    return true;
}
