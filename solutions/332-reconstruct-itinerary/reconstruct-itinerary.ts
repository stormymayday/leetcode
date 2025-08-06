function findItinerary(tickets: string[][]): string[] {
    const graph: Map<string, string[]> = new Map();

    // Build the graph and sort destinations in reverse lex order
    for (const [from, to] of tickets) {
        if (!graph.has(from)) graph.set(from, []);
        graph.get(from)!.push(to);
    }

    for (const [from, neighbors] of graph.entries()) {
        neighbors.sort((a, b) => b.localeCompare(a)); // reverse sort
    }

    const stack: string[] = ['JFK'];
    const itinerary: string[] = [];

    while (stack.length > 0) {
        const top = stack[stack.length - 1];
        const neighbors = graph.get(top);

        if (neighbors && neighbors.length > 0) {
            stack.push(neighbors.pop()!);
        } else {
            itinerary.push(stack.pop()!);
        }
    }

    return itinerary.reverse();
}
