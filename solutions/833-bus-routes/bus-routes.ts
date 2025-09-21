function numBusesToDestination(routes: number[][], source: number, target: number): number {

    // Edge Case: source === target
    if (source === target) {
        return 0;
    }

    // Mapping bus to it's stops for O(1) access (Essentially same as input but set instead of an array)
    const busToStops = new Map<number, Set<number>>(); // key: bus -> value: [stops]
    // Setting up a connection map between buses if they share a stop
    const adjList = new Map<number, Set<number>>(); // key: bus -> value: [connected buses]
    for (let busID = 0; busID < routes.length; busID += 1) {
        busToStops.set(busID, new Set(routes[busID]));
        adjList.set(busID, new Set());
    }

    // Mapping stops to buses (this will allow to connect the adjacency list)
    const stopToBuses = new Map<number, Set<number>>();
    for (let busID = 0; busID < routes.length; busID += 1) {
        for (const stop of routes[busID]) {
            if (!stopToBuses.has(stop)) {
                stopToBuses.set(stop, new Set());
            }
            stopToBuses.get(stop).add(busID);
        }
    }

    // Connecting the adjacency list
    for (const [stop, buses] of stopToBuses.entries()) {
        if (buses.size > 1) {
            // Need to create a bi-directional connection here
            const busIDs = [...buses];
            for (let i = 0; i < busIDs.length - 1; i += 1) {
                for (let j = i + 1; j < busIDs.length; j += 1) {
                    const bus1 = busIDs[i];
                    const bus2 = busIDs[j];
                    adjList.get(bus1).add(bus2);
                    adjList.get(bus2).add(bus1);
                }
            }
        }
    }

    let queue: [number, number][] = [];
    const visited = new Set<number>();
    for (const [bus, stops] of busToStops.entries()) {
        if (stops.has(source)) {
            queue.push([bus, 1]);
            visited.add(bus);
        }
    }

    while (queue.length > 0) {

        const n = queue.length;
        const nextQueue: [number, number][] = [];

        for (let i = 0; i < n; i += 1) {

            const [currBus, busCount] = queue[i];

            if (busToStops.get(currBus).has(target)) {
                return busCount;
            }

            for (const neighbor of adjList.get(currBus)) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextQueue.push([neighbor, busCount + 1]);
                }
            }

        }

        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return -1;

};