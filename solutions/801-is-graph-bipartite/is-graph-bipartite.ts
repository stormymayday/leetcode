function isBipartite(graph: number[][]): boolean {
    for(let i = 0; i < graph.length; i += 1) {
        if(bfs(graph, i) === false) {
            return false;
        } 
    }
    return true;
};

function bfs(graph: number[][], src: number): boolean {
    const red = new Set<number>();
    const blue = new Set<number>();
    red.add(src); // adding first node into red
    const queue = [[src, 'red']];
    while(queue.length > 0) {
        const [node, neighborColor] = queue.shift();
        for(const neighbor of graph[node]) {
            if(neighborColor === 'red') {
                if(red.has(neighbor)) {
                    return false;
                } else if(blue.has(neighbor)) {
                    continue;
                } else {
                    blue.add(neighbor);
                    queue.push([neighbor, 'blue']);
                }
            } else {
                if(blue.has(neighbor)) {
                    return false;
                } else if(red.has(neighbor)) {
                    continue;
                } else {
                    red.add(neighbor);
                    queue.push([neighbor, 'red']);
                }
                
            }
        }
    }
    return true;
}