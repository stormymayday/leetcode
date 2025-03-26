function indexOfChar(char: string):number {
    if(char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } else if(char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    }
}
function compareCharCount(arr1: number[], arr2: number[]):boolean {
    for(let i = 0; i < arr1.length; i++) {
        if(arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
function checkInclusion(s1: string, s2: string): boolean {
    
    const s1CharCount = new Array(52).fill(0);
    const s2CharCount = new Array(52).fill(0);

    for(let i = 0; i < s1.length; i++) {
        s1CharCount[indexOfChar(s1[i])]++;
        s2CharCount[indexOfChar(s2[i])]++;
    }

    if(compareCharCount(s1CharCount, s2CharCount)) {
        return true;
    }

    let left = 0;
    for(let right = s1.length; right < s2.length; right++) {

        s2CharCount[indexOfChar( s2[right] )]++;
        s2CharCount[indexOfChar( s2[left] )]--;

        if(compareCharCount(s1CharCount, s2CharCount)) {
            return true;
        }

        left++;

    }

    return false;

};