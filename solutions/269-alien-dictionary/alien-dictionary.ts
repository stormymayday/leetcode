function alienOrder(words: string[]): string {
    // Initialize the adjacency list:
    const adjList = new Map<string, Set<string>>();
    // Iterate over every word
    for(const word of words) {
        // Iterate over each character of the word
        for(const char of word) {
            if(!adjList.has(char)) {
                // create a mapping of char to set 
                adjList.set(char, new Set());
            }
        }
    }
    
    // Build the Adjacency List by going through words in pairs
    for(let i = 0; i < words.length - 1; i += 1) {
        // Get adjacent pair of words
        const word1 = words[i];
        const word2 = words[i + 1];
        // Get the minimum length of the two words
        const minLen = Math.min(word1.length, word2.length);
        // Edge Case: if both words have the same prefix but the first word is longer than the second word
        if(word1.substring(0, minLen) === word2.substring(0, minLen) && word1.length > word2.length) {
            // invalid ordering
            return ""; // exit early
        }
        // Otherwise, compare words character by character
        for(let j = 0; j < minLen; j += 1) {
            const char1 = word1[j];
            const char2 = word2[j];
            // Look for the first divergence
            if(char1 !== char2) {
                // Since we know that word1 comes before word2
                // char1 must come before char2
                adjList.get(char1).add(char2);
                break; // we are only looking for the first divergence
            }
        }
    }
    
    // Kahn's Algorithm
    const inDegree = new Map<string, number>();
    for(const node of adjList.keys()) {
        if(!inDegree.has(node)) {
            inDegree.set(node, 0);
        }
    }
    for(const parent of adjList.keys()) {
        for(const child of adjList.get(parent)) {
            inDegree.set(child, inDegree.get(child) + 1);
        }
    }
    const queue: string[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 0) {
            queue.push(node);
        }
    }
    const topOrder: string[] = [];
    while(queue.length > 0) {
        const current = queue.shift();
        topOrder.push(current);
        for(const child of adjList.get(current)) {
            inDegree.set(child, inDegree.get(child) - 1);
            if(inDegree.get(child) === 0) {
                queue.push(child);
            }
        }
    }
    if(topOrder.length === adjList.size) {
        return topOrder.join("");
    } else {
        return "";
    }
};