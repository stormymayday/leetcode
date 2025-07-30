function alienOrder(words: string[]): string {

   const adjList = new Map<string, Set<string>>();
    for(const word of words) {
        for(const char of word) {
            if(!adjList.has(char)) {
                adjList.set(char, new Set<string>());
            }
        }
    }
    for(let i = 0; i < words.length - 1; i += 1) {
        // Compare two adjacent words
        const word1 = words[i];
        const word2 = words[i + 1];
        const minLength = Math.min(word1.length, word2.length);
        // Edge Case!
        if(word1.substring(0, minLength) === word2.substring(0, minLength) && word1.length > word2.length) {
            return ""; // early exit
        }
        // Compare character by character until first discrepency
        for(let j = 0; j < minLength; j += 1) {
            const char1 = word1[j];
            const char2 = word2[j];
            if(char1 !== char2) {
                adjList.get(char1).add(char2);
                break;
            }
        }
    }

    return kahns(adjList);
};

function kahns(adjList: Map<string, Set<string>>): string {
    const inDegree = new Map<string, number>();
    for(const char of adjList.keys()) {
        inDegree.set(char, 0);
    }
    for(const char of adjList.keys()) {
        for(const neighbor of adjList.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }
    const queue: string[] = [];
    for(const [char, count] of inDegree.entries()) {
        if(count === 0) {
            queue.push(char);
        }
    }
    const topOrder: string[] = [];
    while(queue.length > 0) {
        const current = queue.shift();
        topOrder.push(current);
        for(const neighbor of adjList.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    if(topOrder.length === adjList.size) {
        return topOrder.join("");
    } else {
        return "";
    }
}
