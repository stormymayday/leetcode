function minRemoveToMakeValid(s: string): string {
    
    const arr = [];

    let count = 0;

    for(let i = 0; i < s.length; i++) {
        const currentChar = s[i];
        if(currentChar === '(') {
            arr.push(currentChar);
            count++;
        } else if(currentChar === ')' && count > 0) {
            arr.push(currentChar);
            count--;
        } else if(currentChar !== ')' ) {
            arr.push(currentChar);
        }
    }

    const result = [];
    for(let i = arr.length - 1; i >= 0; i--) {

        const currentChar = arr[i];

        if(currentChar === '(' && count > 0) {
            count--;
        } else {
            result.push(currentChar);
        }

    }

    return result.reverse().join("");

};