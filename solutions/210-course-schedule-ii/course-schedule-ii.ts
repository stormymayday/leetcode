function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    return dfs(adjList);
};

function dfs(adjList: Map<number, Set<number>>):number[] {

    const topOrder = [];
    const visiting = new Set();
    const visited = new Set();

    for(const node of adjList.keys()) {
        if(!visited.has(node)) {
            if(traverse(node) === false) {
                return [];
            }
        }
    }

    return topOrder;

    function traverse(src) {
        if(visited.has(src)) {
            return true;
        }

        if(visiting.has(src)) {
            return false;
        }

        visiting.add(src)

        for(const neighbor of adjList.get(src)) {
            if(traverse(neighbor) === false) {
                return false;
            }
        }

        visiting.delete(src);
        visited.add(src);
        topOrder.push(src);

        return true;
    }

}

function buildAdjList(n: number, edges: number[][]) {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
    }
    return adjList;
}