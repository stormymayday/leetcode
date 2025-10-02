function isBipartite(graph: number[][]): boolean {

    const colorMap = new Map<number, boolean>();

    for(let i = 0; i < graph.length; i += 1) {
        if(!colorMap.has(i)) { // this check is important to avoid false negatives
            if(dfs(i, graph, colorMap, true) === false) {
                return false;
            }
        }
    }
    return true;   
};

function dfs(src: number, graph: number[][], colorMap: Map<number, boolean>, currColor: boolean): boolean {
    // Base Case: if node has been colored
    if(colorMap.has(src)) {
        // it must be equal to 'currColor'
        return colorMap.get(src) === currColor; // true or false
    }

    // Otherwise, 'color' current node
    colorMap.set(src, currColor);

    // Recurse on the neighbors flipping 'currentColor'
    for(const neighbor of graph[src]) {
        // If any of the calls return 'false', exit early
        if(dfs(neighbor, graph, colorMap, !currColor) === false) {
            return false;
        }
    }

    // If none of the neighbors return 'false', then return 'true'
    return true;
}