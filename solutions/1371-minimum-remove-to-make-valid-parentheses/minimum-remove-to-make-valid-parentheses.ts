function minRemoveToMakeValid(s: string): string {

    const arr = s.split('');
    const stack = [];

    for(let i = 0; i < arr.length; i++) {

        const currentChar = arr[i];

        if(currentChar === '(') {
            stack.push(i);
        } else if(currentChar === ')' && stack.length === 0) {
            arr[i] = "";
        } else if(currentChar === ')' && stack.length !== 0) {
            stack.pop();
        }

    }

    while(stack.length !== 0) {
        const index = stack.pop();
        arr[index] = "";
    }


    return arr.join("");
};