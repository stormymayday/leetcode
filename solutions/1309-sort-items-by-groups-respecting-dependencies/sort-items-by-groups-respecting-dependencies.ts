function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
    
    // 1. Assign groups to items with no groups
    let newGroupId = m;
    for(let i = 0; i < group.length; i += 1) {
        if(group[i] === -1) {
            group[i] = newGroupId;
            newGroupId += 1;
        }
    }

    // 2. Adjacency Lists
    const adjListItems = new Map<number, Set<number>>();
    const adjListGroups = new Map<number, Set<number>>();
    for(let item = 0; item < n; item += 1) {
        adjListItems.set(item, new Set<number>());
    }
    for(let group = 0; group < newGroupId; group += 1) {
        adjListGroups.set(group, new Set<number>());
    }
    for(let item = 0; item < n; item += 1) {
        if(beforeItems[item].length > 0) {
            for(const before of beforeItems[item]) {
                adjListItems.get(before).add(item);
                if(group[before] !== group[item]) {
                    adjListGroups.get(group[before]).add(group[item]);
                }
            }
        }
    }

    // 3. Topological Ordering
    const itemsTopOrder: number[] = kahns(adjListItems);
    const groupsTopOrder: number[] = kahns(adjListGroups);

    // 4. Cycle check
    if(itemsTopOrder.length === 0 || groupsTopOrder.length === 0) {
        return [];
    }

    // 5. Place items into groups using Topological Ordering
    const groupsOfTopologicallySortedItems: number[][] = new Array(newGroupId);
    for(let groupId = 0; groupId < newGroupId; groupId += 1) {
        groupsOfTopologicallySortedItems[groupId] = [];
    }
    for(let item = 0; item < itemsTopOrder.length; item += 1) {
        const groupId = group[itemsTopOrder[item]];
        groupsOfTopologicallySortedItems[groupId].push(itemsTopOrder[item]);
    }

    // 6. Using Group Topological Ordering and the array above, create the result
    const res: number[] = [];
    for(let groupId = 0; groupId < groupsTopOrder.length; groupId += 1) {
        res.push(...groupsOfTopologicallySortedItems[groupsTopOrder[groupId]]);
    }
    return res;

};

function kahns(adjList: Map<number, Set<number>>): number[] {
    // 1. in-degree map
    const inDegreeMap = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. 'ready' queue / stack
    const ready: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }

    // 3. Kahn's BFS
    const topOrder: number[] = [];
    while(ready.length > 0) {
        const currNode = ready.pop();
        topOrder.push(currNode);
        for(const neighbor of adjList.get(currNode)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if(inDegreeMap.get(neighbor) === 0) {
                ready.push(neighbor);
            }
        }
    }

    // 4. Cycle check & return
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return [];
    }
}