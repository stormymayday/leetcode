function isAlphanumeric(char: string): boolean {
    // Check if the character is a letter (a-z, A-Z) or a digit (0-9)
    return (
        (char >= 'a' && char <= 'z') || 
        (char >= 'A' && char <= 'Z') ||
        (char >= '0' && char <= '9')
    );
}

function isPalindrome(s: string): boolean {
    // Empty strings and single characters are palindromes by definition
    if(s.length < 2) {
        return true;
    }

    // Create a new string with only alphanumeric characters in lowercase
    let cleanStr = "";
    for(let i = 0; i < s.length; i++) {
        const currentChar = s[i];
        if(isAlphanumeric(currentChar)) {
            cleanStr += currentChar.toLowerCase();
        } else {
            // Skip non-alphanumeric characters
            continue;
        }
    }

    // Check if the cleaned string is equal to its reverse
    // This is a direct palindrome test without character-by-character comparison
    return cleanStr === cleanStr.split("").reverse().join("");
};