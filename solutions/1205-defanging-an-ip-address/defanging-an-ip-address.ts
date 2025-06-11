function defangIPaddr(address: string): string {
    const result = [];
    for(let i = 0; i < address.length; i += 1) {
        if(address[i] === '.') {
            result.push('[.]');
        } else {
            result.push(address[i]);
        }
    }
    return result.join("");
};