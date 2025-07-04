function isBipartite(graph: number[][]): boolean {
    const state = new Map<number, boolean>();
    for(let i = 0; i < graph.length; i += 1) {
        if(!state.has(i)) {
            if(bfs(graph, i, state) === false) {
                return false;
            }
        }
    }
    return true;
};

function bfs(graph:number[][], src: number, state: Map<number, boolean>):boolean {

    if(!state.has(src)) {
        state.set(src, true);
    }

    const queue: [number, boolean][] = [[src, state.get(src)]];

    while(queue.length > 0) {
        const [node, stateVal] = queue.shift();
        for(const neighbor of graph[node]) {
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