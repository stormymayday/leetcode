function alienOrder(words: string[]): string {

    // Try building an adjacency list
    const adjList: Map<string, Set<string>> | undefined = buildAdjList(words);

    if (adjList !== undefined) {
        // If adjList was built successfully (no edge case encountered), try running Kahn's algorithm
        return kahns(adjList);
    } else {
        // Otherwise, adjList encountered an invalid ordering edge case
        return "";
    }

};

function kahns(adjList: Map<string, Set<string>>): string {

    // 1. Build and inDegree hash map
    const inDegree = new Map<string, number>();
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialize the 'ready' queue for nodes with in-degree of zero
    const queue: string[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            queue.push(node);
        }
    }

    // 3. Kahn's BFS
    const topOrder: string[] = [];
    while (queue.length > 0) {
        const currNode = queue.shift();
        topOrder.push(currNode);
        for (const neighbor of adjList.get(currNode)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 4. Cycle check
    if (topOrder.length === adjList.size) {
        return topOrder.join("");
    } else {
        return ""; // Cycle detected
    }

}

function buildAdjList(words: string[]): Map<string, Set<string>> | undefined {

    const adjList = new Map<string, Set<string>>();

    // Initialize adjacency list with all characters
    for (const word of words) {
        for (const char of word) {
            if (!adjList.has(char)) {
                adjList.set(char, new Set());
            }
        }
    }

    for (let i = 0; i < words.length - 1; i += 1) {
        // Compare two adjacent words character by character
        const word1 = words[i];
        const word2 = words[i + 1];
        let divergenceFound = false;
        for (let j = 0; j < Math.min(word1.length, word2.length); j += 1) {
            const char1 = word1[j];
            const char2 = word2[j]
            if (char1 !== char2) {
                // First divergence signifies that char1 comes before char2
                // in the alien alphabet (assuming words are sorted lexicographically)
                adjList.get(char1).add(char2);
                divergenceFound = true;
                break;
            }
        }
        // Edge Case: If words have same prefix but word1 is longer
        // This violates lexicographical ordering (shorter should come first)
        if (divergenceFound === false && word1.length > word2.length) {
            return undefined; // invalid order
        }
    }

    return adjList;
}