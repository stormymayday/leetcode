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

    // 2. Setting up adjacency Lists for items and groups
    const itemAdjList = new Map();
    for(let item = 0; item < n; item += 1) {
        itemAdjList.set(item, new Set());
    }
    const groupAdjList = new Map();
    for(let id = 0; id < groupId; id += 1) {
        groupAdjList.set(id, new Set());
    }

    for(let item = 0; item < n; item += 1) {
        for(const prev of beforeItems[item]) {
            // Each (prev -> item) represents an edge in the item graph
            itemAdjList.get(prev).add(item);

            //  If they belong to different groups, add an edge in the group graph.
            if(group[item] !== group[prev]) {
                groupAdjList.get(group[prev]).add(group[item]);
            }
        }

    }

    // 3. Perform Topological Ordering
    const itemTopOrder = kahnsAlgorithm(itemAdjList);
    const groupTopOrder = kahnsAlgorithm(groupAdjList);

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

function kahnsAlgorithm(adjList: Map<number, Set<number>>): number[] {

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