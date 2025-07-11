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
        if(
            // combo.length === n
            index === n
            ) {
            res.push(combo.join("")); // O(n)
            return;
        }

        for(const digit of digitToChar[digits[index]]) {
            combo.push(digit);
            helper(index + 1);
            combo.pop();
        }
    }
    helper(0);
    return res;
};