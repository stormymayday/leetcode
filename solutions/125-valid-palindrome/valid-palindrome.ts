function isAlphanumeric(char: string): boolean {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9');
}

function isPalindrome(s: string): boolean {

    if(s.length <= 1) return true;

    let left = 0
    let right = s.length - 1;

    while(left < right) {
        while(left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while(left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        // Compare characters in a case-insensitive manner
        if(s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        left++;
        right--;
    }

    return true;

};