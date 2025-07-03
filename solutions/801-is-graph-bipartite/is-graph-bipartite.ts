function isBipartite(graph: number[][]): boolean {

    const state = new Map<number, boolean>();

    for(let i = 0; i < graph.length; i += 1) {
        if(bfs(graph, i, state) === false) {
            return false;
        }
    }

    return true;

};

function bfs(adjList: number[][], src: number, state: Map<number, boolean>):boolean {

    if(!state.has(src)) {
        // arbitrarily setting the value to true
        state.set(src, true);
    }

    const queue: [number, boolean][] = [[src, state.get(src)]];

    while(queue.length > 0) {
        const [node, stateVal] = queue.shift();
        for(const neighbor of adjList[node]) {

            if(!state.has(neighbor)) {

                state.set(neighbor, !stateVal);

                queue.push([
                    neighbor,
                    !stateVal
                ]);

            } else if(state.get(neighbor) === stateVal) {
                return false;
            }

        }
    }

    return true;

}