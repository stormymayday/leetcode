function toGoatLatin(sentence: string): string {

    const set = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    
    const words = sentence.split(" ");

    const result = [];

    for(let i = 0; i < words.length; i++) {
        const word = words[i].split("");

        let processedWord = [];

        // word starts with a vowel
        if(set.has(word[0])) {
            processedWord = [...word];
        }
        // word starts with a consonant
        else {
            processedWord = [...word.slice(1)];
            processedWord.push(word[0]);
        }

        processedWord.push('ma');

        // appending 'a' based on current index
        for(let j = 0; j <= i; j++) {
            processedWord.push('a');
        }

        result.push(processedWord.join(""));
    }

    return result.join(" ");

};