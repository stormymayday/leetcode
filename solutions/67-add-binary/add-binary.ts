function addBinary(a: string, b: string): string {

    const res: string[] = [];

    let p1 = a.length - 1;
    let p2 = b.length - 1;
    let carry = '0';

    while(p1 >= 0 || p2 >= 0 || carry !== '0') {

        const bit1 = p1 >= 0 ? a[p1] : '0';
        const bit2 = p2 >= 0 ? b[p2] : '0';

        // both bits are 1 and carry is 1
        if(bit1 === '1' && bit2 === '1' && carry === '1') {
            res.push('1');
            carry = '1';
        } 
        // both bits are 1 and carry is 0
        else if(bit1 === '1' && bit2 === '1' && carry === '0') {
            res.push('0');
            carry = '1';
        }
        // one of the bits is 1 and carry is 1
        else if((bit1 === '1' || bit2 === '1') && carry === '1') {
            res.push('0');
            carry = '1';
        } 
        // one of the bits is 1 and carry is 0
        else if((bit1 === '1' || bit2 === '1') && carry === '0') {
            res.push('1');
            carry = '0';
        }
        // both bits are 0 and carry is 1
        else if(bit1 === '0' && bit2 === '0' && carry === '1') {
            res.push('1')
            carry = '0';
        } 
        // both bits are 0 and carry is 0
        else {
            res.push('0');
            carry = '0';
        }

        if(p1 >= 0) {
            p1 -= 1;
        }
        if(p2 >= 0) {
            p2 -= 1;
        }

    }

    return res.reverse().join("");
    
};