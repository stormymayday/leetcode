function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {
    // 1. If an item does not belong to a  group, assign it a unique group id
    let groupId = m;
    for(let item = 0; item < n; item += 1) {
        // if item has no group (-1)
        if(group[item] === -1) {
            // assign a group id
            group[item] = groupId;
            groupId += 1;
        }
    }

    // 2. Setting up adjacency Lists and in-degree maps for items and groups
    const itemAdjList = new Map();
    const itemInDegree = new Map();
    for(let item = 0; item < n; item += 1) {
        itemAdjList.set(item, new Set());
        itemInDegree.set(item, 0);
    }
    const groupAdjList = new Map();
    const groupInDegree = new Map();
    for(let id = 0; id < groupId; id += 1) {
        groupAdjList.set(id, new Set());
        groupInDegree.set(id, 0);
    }

    for(let item = 0; item < n; item += 1) {
        for(const prev of beforeItems[item]) {
            // Each (prev -> item) represents an edge in the item graph
            itemAdjList.get(prev).add(item);
            itemInDegree.set(item, itemInDegree.get(item) + 1);

            //  If they belong to different groups, add an edge in the group graph.
            // if(group[item] !== group[prev]) {
            //     groupAdjList.get(group[prev]).add(group[item]);
            //     groupInDegree.set(group[item], groupInDegree.get(group[item]) + 1);
            // }
            if (group[item] !== group[prev]) {
                const fromGroup = group[prev];
                const toGroup = group[item];
                const neighbors = groupAdjList.get(fromGroup);
                if (!neighbors.has(toGroup)) {
                    neighbors.add(toGroup);
                    groupInDegree.set(toGroup, groupInDegree.get(toGroup) + 1);
                }
            }
        }

    }

    // 3. Perform Topological Ordering
    const itemTopOrder = kahnsAlgorithm(itemAdjList, itemInDegree);
    const groupTopOrder = kahnsAlgorithm(groupAdjList, groupInDegree);

    // 4. Check for cycles
    if(itemTopOrder.length === 0 || groupTopOrder.length === 0) {
        return []; // there was a cycle
    }

    // 5. Items are sorted regardless of groups, we need to 
    // differentiate them by the groups they belong to.
    const orderedGroups: number[][] = new Array(groupId);
    for(let i = 0; i < orderedGroups.length; i += 1) {
        orderedGroups[i] = [];
    }
    for(const item of itemTopOrder) {
        orderedGroups[group[item]].push(item);
    }

    // 6. Concatenate sorted items in all sorted groups
    const result: number[] = [];
    for(let i = 0; i < groupTopOrder.length; i += 1) {
        const groupIndex = groupTopOrder[i];
        result.push(...orderedGroups[groupIndex]);
    }
    return result;
};

function kahnsAlgorithm(adjList: Map<number, Set<number>>, inDegree: Map<number, number>): number[] {
    const queue: number[] = [];
    for(const [item, count] of inDegree.entries()) {
        if(count === 0) {
            queue.push(item);
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
    // Check for cycles
    if(topOrder.length !== adjList.size) {
        return []; // cycle
    } else {
        return topOrder;
    }
}