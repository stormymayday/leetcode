function accountsMerge(accounts: string[][]): string[][] {

    // 1. Create a bi-directional adjacency List using Hub/Star method
    const adjList = buildAdjList(accounts);

    // 2. Run BFS and fill in the result
    const visited = new Set<string>();
    const result: string[][] = [];
    for (const account of accounts) {
        const name = account[0];
        const firstEmail = account[1];
        if (!visited.has(firstEmail)) {

            const mergedEmails: string[] = [];
            bfs(firstEmail, adjList, visited, mergedEmails);

            // 2.1. Sort the emails
            mergedEmails.sort();
            // 2.2. Add name in the beginning and push to result
            result.push([name, ...mergedEmails]);

        }
    }
    return result;
};

function bfs(
    src: string,
    adjList: Map<string, Set<string>>,
    visited: Set<string>,
    merged: string[]
): void {
    const queue: string[] = [];
    queue.push(src);
    visited.add(src);
    while (queue.length > 0) {
        const currNode = queue.shift();
        merged.push(currNode);
        for (const neighbor of adjList.get(currNode)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
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