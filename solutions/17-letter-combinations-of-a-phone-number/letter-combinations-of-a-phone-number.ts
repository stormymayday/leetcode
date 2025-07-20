function letterCombinations(digits: string): string[] {
    if(digits.length === 0) {
        return [];
    }
    const numberToLetters = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "qprs",
        "8": "tuv",
        "9": "wxyz"
    };
    const res: string[] = [];
    const curr: string[] = [];
    function helper(index: number):void {
        if(curr.length === digits.length) {
            res.push(curr.join("")); // O(n)
            return;
        }
        if(index === digits.length) {
            return;
        }
        for(let i = index; i < digits.length; i += 1) {
            for(const char of numberToLetters[digits[index]]) {
                curr.push(char);
                helper(i + 1); // i or index
                curr.pop();
            }
        }

    }
    helper(0);
    return res;
};