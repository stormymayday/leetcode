function letterCombinations(digits: string): string[] {
    if(digits.length === 0) {
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
    const result: string[] = [];
    const curCombo: number[] = [];
    function helper(index: number): void {
        if(index === digits.length) {
            result.push(curCombo.join(""));
            return;
        }

        for(const char of digitToChar[digits[index]]) {
            curCombo.push(char);
            helper(index + 1);
            curCombo.pop();
        }
    }
    helper(0);
    return result;
};