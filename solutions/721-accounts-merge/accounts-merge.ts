
function accountsMerge(accounts: string[][]): string[][] {

    // 1. Build an adjacency list
    const adjList = buildAdjList(accounts);

    // 2. DFS to find connected components
    const visited = new Set<string>();
    const result: string[][] = [];

    for (const account of accounts) {
        const name = account[0];
        const firstEmail = account[1];

        if (!visited.has(firstEmail)) {
            const mergedEmails: string[] = [];
            dfs(firstEmail, adjList, visited, mergedEmails);

            // Sort emails and add name at the beginning
            mergedEmails.sort();
            result.push([name, ...mergedEmails]);
        }
    }

    return result;
}

function dfs(
    email: string,
    adjList: Map<string, Set<string>>,
    visited: Set<string>,
    mergedEmails: string[]
): void {
    visited.add(email);
    mergedEmails.push(email);

    if (adjList.has(email)) {
        for (const neighbor of adjList.get(email)!) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, adjList, visited, mergedEmails);
            }
        }
    }
}

function buildAdjList(accounts: string[][]): Map<string, Set<string>> {

    const adjList = new Map<string, Set<string>>();

    for (const account of accounts) {
        // Start from index 1 (first email), not 0 (name)
        for (let i = 1; i < account.length; i++) {
            // Get the actual email string
            const email = account[i];

            if (!adjList.has(email)) {
                adjList.set(email, new Set());
            }

            // Connect this email to all other emails in the same account
            for (let j = 1; j < account.length; j++) {
                // Don't connect email to itself
                if (i !== j) {
                    const otherEmail = account[j];
                    adjList.get(email).add(otherEmail);
                }
            }
        }
    }

    return adjList;
}