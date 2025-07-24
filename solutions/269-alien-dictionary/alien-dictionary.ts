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
    
    // postOrder DFS with White Gray Black
    function dfs(src: string): boolean {
        if(visited.has(src)) {
            return false; // no cycle
        }
        if(visiting.has(src)) {
            return true; // cycle
        }
        visiting.add(src);
        for(const neighbor of adjList.get(src)) {
            if(dfs(neighbor) === true) {
                return true; // cycle
            }
        }
        visiting.delete(src);
        visited.add(src);
        topOrder.push(src);
        return false; // no cycle
    }
    const visiting = new Set<string>();
    const visited = new Set<string>();
    const topOrder: string[] = [];
    for(const node of adjList.keys()) {
        if(dfs(node) === true) {
            return "";
        }
    }
    return topOrder.reverse().join("");
};