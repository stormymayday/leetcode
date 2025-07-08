function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    // return kahns(adjList);
    return dfs(adjList);
};

function dfs(adjList: Map<number, Set<number>>):number[] {
    const topOrder: number[] = [];
    const visiting = new Set<number>();
    const visited = new Set<number>();
    function traverse(node: number):boolean {
        if(visited.has(node)) {
            return true;
        }
        if(visiting.has(node)) {
            return false;
        }
        visiting.add(node);
        for(const neighbor of adjList.get(node)) {
            if(traverse(neighbor) === false) {
                return false;
            }
        }
        visiting.delete(node);
        visited.add(node);
        topOrder.push(node);
        return true;
    }
    for(const node of adjList.keys()) {
        if(!visited.has(node)) {
            if(traverse(node) === false) {
                return [];
            }
        }
    }
    return topOrder;
}

function kahns(adjList: Map<number, Set<number>>):number[] {
    const numParents = new Map<number, number>();
    for(const node of adjList.keys()) {
        numParents.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const child of adjList.get(node)){
            numParents.set(child, numParents.get(child) + 1);
        }
    }

    const ready: number[] = [];
    for(const node of numParents.keys()) {
        if(numParents.get(node) === 0) {
            ready.push(node);
        }
    }

    const topOrder:number[] = [];
    while(ready.length > 0) {
        const current = ready.pop();
        topOrder.push(current);
        for(const child of adjList.get(current)) {
            numParents.set(child, numParents.get(child) - 1);
            if(numParents.get(child) === 0) {
                ready.push(child);
            }
        }
    }

    if(topOrder.length !== adjList.size) {
        return [];
    } else {
        return topOrder.reverse();
    }
}

function buildAdjList(n: number, edges: number[][]):Map<number, Set<number>> {
    const adjList = new Map<number, Set<number>>();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
    }
    return adjList;
}