function isPalindrome(s: string): boolean {
    // Empty strings and single characters are palindromes by definition
    if(s.length < 2) {
        return true;
    }

    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Check if the cleaned string is equal to its reverse
    return cleanStr === cleanStr.split("").reverse().join("");
};