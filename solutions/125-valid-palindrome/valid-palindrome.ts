function isPalindrome(s: string): boolean {
    
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');

    if(s.length <= 1) return true;

    let left = 0
    let right = s.length - 1;

    while(right > left) {
        if(s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;

};