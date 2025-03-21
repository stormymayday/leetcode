function isPalindrome(s: string): boolean {
    // Step 1: Remove all non-alphanumeric characters (e.g., spaces, punctuation)
    // and convert the string to lowercase to ensure the palindrome check is case-insensitive.
    // This is done using a regular expression that matches non-alphanumeric characters
    // and replaces them with an empty string.
    const cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // Step 2: Check if the cleaned string is the same when reversed.
    // We split the string into an array of characters, reverse it, and join it back into a string.
    // If the original cleaned string is the same as its reversed version, it's a palindrome.
    return cleanStr === cleanStr.split("").reverse().join("");
}