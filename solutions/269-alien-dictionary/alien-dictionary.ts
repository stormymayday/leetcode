function alienOrder(words: string[]): string {
    
    const adjList: Map<string, Set<string>> | undefined = buildAdjList(words);

    // Edge Case encountered: word1 and word2 had same prefix but word1 was longer
    if(adjList === undefined) {
        return "";
    }

    // Try performing Topological ordering (Can encounter a cycle)
    return kahns(adjList);

};

function kahns(adjList: Map<string, Set<string>>): string {

    // 1. in-degree map
    const inDegreeMap = new Map<string, number>();
    for(const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. ready queue/stack for nodes with in-degree of zero
    const ready: string[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }

    // 3. Kahn's BFS
    const topOrder: string[] = [];
    while(ready.length > 0) {
        const currNode = ready.pop();
        topOrder.push(currNode);
        for(const neighbor of adjList.get(currNode)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if(inDegreeMap.get(neighbor) === 0) {
                ready.push(neighbor);
            }
        }
    }

    // 4. Cycle check & return
    if(topOrder.length === adjList.size) {
        return topOrder.join("");
    } else {
        return ""; // there was a cycle
    }

}

function buildAdjList(words: string[]): Map<string, Set<string>> | undefined {

    const adjList = new Map();

    // 1. Pre-fill out the map with all the characters
    for(const word of words) {
        for(const char of word) {
            if(!adjList.has(char)) {
                adjList.set(char, new Set());
            }
        }
    }

    // 2. Compare two adjacent words (to establish precedence)
    for(let i = 0; i < words.length - 1; i += 1) {

        const word1 = words[i];
        const word2 = words[i + 1];

        // flag for tracking if different char was found
        // If no divergence is found and word1 is longer than word2
        // then words are not ordered in a lexicographically increasing order
        let differentCharFound = false;
        // Character by character (over min length)
        for(let j = 0; j < Math.min(word1.length, word2.length); j += 1) {
            
            const char1 = word1[j];
            const char2 = word2[j];

            // Until first divergence
            if(char1 !== char2) {
                // This means that char1 should come before char2 (char1 is src and char2 is dst)
                adjList.get(char1).add(char2);
                // Set the flag and break (don't need to compare other chars)
                differentCharFound = true;
                break;
            }

        }

        // Edge Case: no divergence is found and word1 is longer than word2
        if(differentCharFound === false && word1.length > word2.length) {
            return undefined; // early exit
        }

    }

    return adjList;

}