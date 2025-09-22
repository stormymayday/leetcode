function canVisitAllRooms(rooms: number[][]): boolean {

    const visited = new Set<number>();

    dfs(0, rooms, visited);

    return visited.size === rooms.length;
    
};

function dfs(src: number, graph: number[][], visited: Set<number>): void {
    if(visited.has(src)) {
        return; // cycle
    }
    visited.add(src);
    for(const neighbor of graph[src]) {
        dfs(neighbor, graph, visited);
    }
}