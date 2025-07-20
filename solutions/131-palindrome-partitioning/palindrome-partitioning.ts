function partition(s: string): string[][] {
    function isPalindrome(str: string): boolean {
        let left = 0;
        let right = str.length - 1;
        while(left < right) {
            if(str[left] !== str[right]) {
                return false;
            }
            left += 1;
            right -= 1;
        }
        return true;
    }
    const res: string[][] = [];
    const part: string[] = [];
    function helper(index: number):void {
        if(index === s.length) {
            res.push([...part]);
            return;
        }
        for(let i = index; i < s.length; i += 1) {
            const str = s.substring(index, i + 1);
            if(isPalindrome(str)) {
                part.push(str);
                helper(i + 1);
                part.pop();
            }
        }
    }
    helper(0);
    return res;
};