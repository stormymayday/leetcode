function groupStrings(strings: string[]): string[][] {
    
    const hashMap = new Map<string, string[]>();

    for(let i = 0; i < strings.length; i += 1) {

        const key = getHash(strings[i]);

        if(!hashMap.has(key)) {
            hashMap.set(key, []);
        }

        hashMap.get(key).push(strings[i]);

    } 

    const res: string[][] = [];
    for(const group of hashMap.values()) {
        res.push(group);
    }
    return res;

};

function getHash(str: string): string {

    const hash: number[] = [];

    for(let i = 0; i < str.length - 1; i += 1) {

        let diff = str[i].charCodeAt(0) - str[i + 1].charCodeAt(0);

        if(diff < 0) {
            diff += 26;
        }

        hash.push(diff);

    }

    return hash.join("#");

}