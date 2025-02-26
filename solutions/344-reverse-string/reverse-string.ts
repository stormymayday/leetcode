/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {

    const stack = [];

    for(let i = 0; i < s.length; i++) {
        stack.push(s[i]);
    }

    for(let i = 0; i < s.length; i++) {
        s[i] = stack.pop();
    }

};