function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {

    // Edge Case: endWord is not in the wordList
    if(!wordList.includes(endWord)) {
        return 0;
    }

    const queue: [string, number][] = [];
    queue.push([beginWord, 1]); // startind distance of 1
    const visited = new Set<string>();
    visited.add(beginWord);

    // BFS
    while(queue.length > 0) {
        const [currWord, currDist] = queue.shift();
        if(currWord === endWord) {
            return currDist;
        }
        for(const neighbor of getNeighbors(currWord, wordList)) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, currDist + 1]);
            }
        }
    }

    // Edge Case: sequence does not exist
    return 0; 
    
};

function getNeighbors(node: string, neighborList: string[]): string[] {
    const neighbors: string[] = [];
    for(const neighbor of neighborList) {
        let diff = 0;
        for(let i = 0; i < neighbor.length; i += 1) {
            if(node[i] !== neighbor[i]) {
                diff += 1;
                if(diff > 1) {
                    break;
                }
            }
        }
        if(diff <= 1) {
            neighbors.push(neighbor);
        }
    }
    return neighbors;
}