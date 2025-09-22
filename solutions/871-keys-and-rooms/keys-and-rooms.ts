function canVisitAllRooms(rooms: number[][]): boolean {

    const visited = new Set<number>();

    dfs(0, rooms, visited);

    return visited.size === rooms.length;
    
};

function dfs(src: number, graph: number[][], visited: Set<number>): void {

    const stack: number[] = [];
    stack.push(src);
    visited.add(src);
    
    while(stack.length > 0) {
        const currNode = stack.pop();
        for(const neighbor of graph[currNode]) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }

}