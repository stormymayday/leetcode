function nextGreatestLetter(letters: string[], target: string): string {

    const targetCharCode: number = target.charCodeAt(0) - "a".charCodeAt(0);

    for(let i = 0; i < letters.length; i += 1) {

        let currCharCode: number = letters[i].charCodeAt(0) - "a".charCodeAt(0); 

        if(currCharCode > targetCharCode) {
            return letters[i];
        }

    }

    return letters[0];
    
};