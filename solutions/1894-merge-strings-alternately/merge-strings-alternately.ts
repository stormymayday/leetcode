function mergeAlternately(word1: string, word2: string): string {

    const result = [];

    let i = 0;
    let j = 0;

    while(i < word1.length && j < word2.length) {
        result.push(word1[i]);
        result.push(word2[j]);
        i++;
        j++;
    }

    while(i < word1.length) {
        result.push(word1[i]);
        i++;
    }

     while(j < word2.length) {
        result.push(word2[j]);
        j++;
    }

    return result.join("");
};