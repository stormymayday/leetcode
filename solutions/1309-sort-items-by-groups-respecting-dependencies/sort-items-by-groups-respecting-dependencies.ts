function sortItems(n: number, m: number, group: number[], beforeItems: number[][]): number[] {

    // 1. Create new group ID for items with no groups and assign it in the groups array
    // group IDs are 0 index based and m is the number of initial groups.
    // Example: groupIds: [0, 1], number of groups is 2 (m = 2). Therefore, newGroupId will be 2 (m - number of groups)
    let newGroupId = m;
    // Iterate over all the items (n - zero index based)
    for(let i = 0; i < n; i += 1) {
        // check if an item has no group (has value of -1 in the groups array)
        if(group[i] === -1) {
            // assign newGroupId for that item
            group[i] = newGroupId;
            // Increment the ID for the next item with no group
            newGroupId +=1;
        }
    }

    // 2. Create adjacency lists for Items and Groups
    const adjListItems = new Map<number, Set<number>>();
    for(let item = 0; item < n; item += 1) {
        adjListItems.set(item, new Set());
    }
    const adjListGroups = new Map<number, Set<number>>();
    // IMPORTANT! number of groups now is 'newGroupId'
    for(let group = 0; group < newGroupId; group += 1) {
        adjListGroups.set(group, new Set());
    }
    // Iterate over every item
    for(let item = 0; item < n; item += 1) {
        // Iterate over every previous item for current item
        for(const prev of beforeItems[item]) {
            
            // Add current item into the Items Adjacency List
            adjListItems.get(prev).add(item);

            // If current and previous are not in the same group
            if(group[item] !== group[prev]) {
                // Add current item group into the Groups Adjacency List
                adjListGroups.get(group[prev]).add(group[item]);
            }

        }

    }

    // 3. Perform Toplogical Ordering of Items and Groups
    const itemsTopOrder = kahns(adjListItems);
    const groupsTopOrder = kahns(adjListGroups);

    // 4. Edge Case: Check for Cycles
    if(itemsTopOrder.length === 0 || groupsTopOrder.length === 0) {
        return []; // there was a cycle -> no solution
    }

    // 5. Group sorted items together
    const sortedItemGroups: number[][] = new Array(newGroupId);
    for(let i = 0; i < sortedItemGroups.length; i += 1) {
        sortedItemGroups[i] = [];
    }
    // Put each item into it's desigated group
    for(const item of itemsTopOrder) {
        sortedItemGroups[group[item]].push(item);
    }

    // 6. Using the Group Topological Ordering, create the final result list
    const res: number[] = [];
    for(let i = 0; i < groupsTopOrder.length; i +=  1) {

        res.push(...sortedItemGroups[groupsTopOrder[i]]);

    }

    return res;

};

function kahns(adjList: Map<number, Set<number>>): number[] {

    // 1. Create inDegree hash hmap
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Set up the 'ready' stack for nodes with in-degree of zero
    const stack: number[] = [];
    for(const [node, inDegreeCount] of inDegree) {
        if(inDegreeCount === 0) {
            stack.push(node);
        }
    }

    // 3. Perform Kahn's BFS
    const topOrder: number[] = [];
    while(stack.length > 0) {
        const currNode = stack.pop();
        topOrder.push(currNode);
        for(const neighbor of adjList.get(currNode)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }
        }
    }

    // 4. Cycle check & return
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return []; // there was a cycle
    }
}