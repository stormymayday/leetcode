function addStrings(num1: string, num2: string): string {
    
    const res: number[] = [];

    let p1 = num1.length - 1;
    let p2 = num2.length - 1;

    let carry = 0;
    while(p1 >= 0 || p2 >= 0 || carry !== 0) {

        let currSum = 0;

        if(p1 >= 0) {
            currSum += Number(num1[p1]);
        }

        if(p2 >= 0) {
            currSum += Number(num2[p2]);
        }

        currSum += carry;

        if(currSum >= 10) {
            currSum = currSum % 10;
            carry = 1;
        } else {
            carry = 0;
        }

        res.push(currSum);

        if(p1 >= 0) {
            p1 -= 1;
        }

        if(p2 >= 0) {
            p2 -= 1;
        }
        
    }

    return res.reverse().join("");

};