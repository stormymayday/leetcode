function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
    
    const adjList = buildAdjList(n, manager);

    return bfs(headID, adjList, informTime);

};

function bfs(src: number, adjList: Map<number, Set<number>>, informTime: number[]): number {

    let queue: [number, number][] = []; // [employee, total inform time so far + manager's inform time]
    queue.push([src, 0]);

    let totalInformTime = 0;

    while(queue.length > 0) {

        const nextQueue: [number, number][] = [];

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, currInformTime] = queue[i];
            totalInformTime = Math.max(totalInformTime, currInformTime);

            for(const neighbor of adjList.get(currNode)) {
                nextQueue.push([neighbor, currInformTime + informTime[currNode]]);
            }

        }

        if(nextQueue.length > 0) {
            queue = nextQueue; 
        } else {
            break;
        }

    }

    return totalInformTime;
}

function buildAdjList(n: number, manager: number[]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(let i = 0; i < manager.length; i += 1) {
        const src = manager[i];
        const dst = i;
        if(src === -1) {
            continue;
        }
        adjList.get(src).add(dst);
    }
    return adjList;
}