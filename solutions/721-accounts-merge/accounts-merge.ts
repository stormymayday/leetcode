function accountsMerge(accounts: string[][]): string[][] {

    // 1. Create a bi-directional adjacency List using Hub/Star method
    const adjList = buildAdjList(accounts);
    
    // 2. Run DFS and fill in the result
    const visited = new Set<string>();
    const result: string[][] = [];
    for(const account of accounts) {
        const name = account[0];
        const firstEmail = account[1];
        if(!visited.has(firstEmail)) {

            const mergedEmails: string[] = [];
            dfs(firstEmail, adjList, visited, mergedEmails);

            // 2.1. Sort the emails
            mergedEmails.sort();
            // 2.2. Add name in the beginning and push to result
            result.push([name, ...mergedEmails]);

        }
    }
    return result;
};

function dfs(
    src: string,
    adjList: Map<string, Set<string>>,
    visited: Set<string>,
    merged: string[]
): void {

    // Pre-Order DFS
    // 1. Visit / Merge current node
    // Mark as visited BEFORE processing (not inside the loop)
    visited.add(src);
    merged.push(src);

    // 2. Visit neighbors
    for(const neighbor of adjList.get(src)) {
        if(!visited.has(neighbor)) {
            dfs(neighbor, adjList, visited, merged);
        }
    }
}

// Hub/Star - First email connects to all others (connection is bi-directional)
function buildAdjList(accounts: string[][]): Map<string, Set<string>> {

    const adjList = new Map();

    for (const account of accounts) {
        // Hub email
        // Start from index 1 (first email), not 0 (name)
        const firstEmail = account[1];
        if (!adjList.has(firstEmail)) {
            adjList.set(firstEmail, new Set());
        }
        // Connect first email to all others
        // Starting from index 2 (other emails)
        for (let i = 2; i < account.length; i += 1) {

            const otherEmail = account[i];

            // Initialize otherEmail if needed
            if (!adjList.has(otherEmail)) {
                adjList.set(otherEmail, new Set());
            }

            // Create bidirectional connection
            adjList.get(firstEmail).add(otherEmail);
            adjList.get(otherEmail).add(firstEmail);
        }
    }
    return adjList;
}