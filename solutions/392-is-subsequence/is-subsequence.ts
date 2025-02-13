function isSubsequence(s: string, t: string): boolean {

    if(s.length > t.length) {
        return false;
    }

    if(!s.length) {
        return true;
    }

    const stack = [...s].reverse();

    for(let i = 0; i < t.length; i++) {
        if(t[i] === stack[stack.length - 1]) {
            stack.pop();
            if(stack.length === 0) {
                return true;
            }
        }
    }

    return false;
    
};