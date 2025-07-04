function possibleBipartition(n: number, dislikes: number[][]): boolean {
    const adjList = buildAdjList(n, dislikes);
    const state = new Map<number, boolean>();
    for(const node of adjList.keys()) {
        if(!state.has(node)) {
            // if(bfs(adjList, node, state) === false) {
            //     return false;
            // }
            if(dfs(adjList, node, state, true) === false) {
                return false;
            }
        }
    }
    return true;
};

function dfs(adjList: Map<number, Set<number>>, src: number, state: Map<number, boolean>, stateVal: boolean):boolean {
    if(state.has(src)) {
        return state.get(src) === stateVal;
    }

    state.set(src, stateVal);

    for(const neighbor of adjList.get(src)) {
        if(dfs(adjList, neighbor, state, !stateVal) === false) {
            return false;
        }
    }

    return true;
}

function bfs(adjList: Map<number, Set<number>>, src: number, state: Map<number, boolean>):boolean {
    if(!state.has(src)) {
        state.set(src, true);
    }

    const queue: [number, boolean][] = [[src, state.get(src)]];

    while(queue.length > 0) {
        const [node, stateVal] = queue.shift();
        for(const neighbor of adjList.get(node)) {
            if(!state.has(neighbor)) {
                state.set(neighbor, !stateVal);
                queue.push([neighbor, !stateVal]);
            }
            if(state.get(neighbor) === stateVal) {
                return false;
            }
        }
    }

    return true;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}