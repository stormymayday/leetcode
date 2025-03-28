function minRemoveToMakeValid(s: string): string {

    const arr = s.split("");

    let count = 0;

    for(let i = 0; i < arr.length; i++) {
        const currentChar = arr[i];
        if(currentChar === ')' && count === 0) {
            arr[i] = "";
        } else if(currentChar === ')' && count > 0) {
            count--;
        } else if(currentChar === '(') {
            count++;
        }
    }

    let i = arr.length - 1;
    while(count > 0) {
        const currentChar = arr[i];
        if(currentChar === '(') {
            arr[i] = "";
            count--;
        }
        i--;
    }

    return arr.join("");
    
};