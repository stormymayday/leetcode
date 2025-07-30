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

    const visiting = new Set<string>();
    const visited = new Set<string>();
    const topOrder: string[] = [];
    for(const node of adjList.keys()) {
        if(dfs(adjList, node, visiting, visited, topOrder) === true) {
            return ""; // there was a cycle
        }
    }
    return topOrder.reverse().join("");
};

function dfs(adjList: Map<string, Set<string>>, src: string, visiting: Set<string>, visited: Set<string>, topOrder: string[]): boolean {
    if(visited.has(src)) {
        return false; // no cycle
    }
    if(visiting.has(src)) {
        return true; // cycle
    }
    visiting.add(src);
    for(const neighbor of adjList.get(src)) {
        if(dfs(adjList, neighbor, visiting, visited, topOrder) === true) {
            return true; // cycle
        }
    }
    visiting.delete(src);
    visited.add(src);
    topOrder.push(src);
    return false; // no cycle
}