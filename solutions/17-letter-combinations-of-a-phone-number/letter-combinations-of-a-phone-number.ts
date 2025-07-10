function letterCombinations(digits: string): string[] {
    const n = digits.length;
    if(n === 0) {
        return [];
    }
    const digitToChar = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "qprs",
        "8": "tuv",
        "9": "wxyz"
    };
    const res = [];
    const combo = [];
    function helper(index) {
        if(index === n) {
            res.push(combo.join(""));
            return;
        }
        for(const char of digitToChar[digits[index]]) {
            combo.push(char);
            helper(index + 1);
            combo.pop();
        }
    }
    helper(0);
    return res;
};