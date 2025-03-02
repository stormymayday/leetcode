function balancedStringSplit(s: string): number {
    let max = 0;

    let counter = 0;

    for(let i = 0; i < s.length; i++) {

        if(s[i] === 'R') {
            counter++;
        } else {
            counter--;
        }

        if(counter === 0) {
            max++;
        }

    }

    return max;
};