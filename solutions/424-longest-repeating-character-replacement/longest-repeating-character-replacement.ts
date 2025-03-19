function indexOfChar(char: string): number  {
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
}
function characterReplacement(s: string, k: number): number {

    let result = 0;

    const sCount = new Array(26).fill(0);

    let left = 0;
    let right = 0;

    while(right < s.length) {

        sCount[indexOfChar(s[right])]++;

        while(right - left + 1 - Math.max(...sCount) > k) {

            sCount[indexOfChar(s[left])]--;
            left++;

        }

        result = Math.max(result, right - left + 1);
        right++;

    }

    return result;
    
};