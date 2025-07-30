function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
    // 1. Assign groups to items with no group
    let groupId = m;
    for(let i = 0; i < group.length; i += 1) {
        if(group[i] === -1) {
            group[i] = groupId;
            groupId +=1;
        }
    }

    // 2. Building Adjacency Lists
    const itemAdjList = new Map<number, Set<number>>();
    const groupAdjList = new Map<number, Set<number>>();
    for(let i = 0; i < n; i += 1) {
        itemAdjList.set(i, new Set());
    }
    for(let i = 0; i < groupId; i += 1) {
        groupAdjList.set(i, new Set());
    }
    for(let item = 0; item < n; item += 1) {
        for(const prev of beforeItems[item]) {
            itemAdjList.get(prev).add(item);

            if(group[prev] !== group[item]) {
                groupAdjList.get(group[prev]).add(group[item]);
            }
        }
    }

    const itemOrder = kahns(itemAdjList);
    const groupOrder = kahns(groupAdjList);

    if(itemOrder.length === 0 || groupOrder.length === 0) {
        return []; // there was a cycle
    }

    // push items into groups
    const grouppedItems: number[][] = new Array(groupId);
    for(let i = 0; i < groupId; i += 1) {
        grouppedItems[i] = [];
    }
    for(let i = 0; i < itemOrder.length; i += 1) {
        const item = itemOrder[i];
        const itemGroup = group[item];
        grouppedItems[itemGroup].push(item);
    }

    // sort by groups
    const result: number[] = [];
    for(let i = 0; i < groupOrder.length; i += 1) {
        const groupIndex = groupOrder[i];
        result.push(...grouppedItems[groupIndex]);
        // result.push(...grouppedItems[groupOrder[i]]);
    }
    return result;

};

function kahns(adjList: Map<number, Set<number>>): number[] {
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }
    const queue: number[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 0) {
            queue.push(node);
        }
    }
    const topOrder: number[] = [];
    while(queue.length > 0) {
        const current = queue.shift();
        topOrder.push(current);
        for(const neighbor of adjList.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return []; // cycle
    }
}