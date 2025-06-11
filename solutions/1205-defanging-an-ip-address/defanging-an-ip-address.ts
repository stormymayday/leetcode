function defangIPaddr(address: string): string {
    const result = [];
    // const arr = Array.from(address);
    const arr = address.split("");
    for(const char of arr) {
        if(char === '.') {
            result.push('[.]');
        } else {
            result.push(char);
        }
    }
    return result.join("");
};