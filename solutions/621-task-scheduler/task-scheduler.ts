function leastInterval(tasks: string[], n: number): number {
    // 1. Create a character frequency count hash map
    const freqMap = new Map<string, number>(); // key: task (character) -> val: count
    for(let i = 0; i < tasks.length; i += 1) {
        freqMap.set(tasks[i], (freqMap.get(tasks[i]) || 0) + 1);
    }

    // 2. Initialize a (naive) Priority Queue
    const maxPQ: [number, string][] = []; // [count, task]
    for(const [task, count] of freqMap.entries()) {
        maxPQ.push([count, task]);
    }

    // 3. Initialze a cooldown queue
    const cooldownQueue: [string, number, number][] = []; // [task, count, cooldown (time + n)]

    let time: number = 0;
    while(maxPQ.length > 0 || cooldownQueue.length > 0) {

        time += 1;

        if(maxPQ.length > 0) {
            maxPQ.sort((a, b) => b[0] - a[0]);
            let [count, task] = maxPQ.shift();
            count -= 1;
            if(count > 0) {
                cooldownQueue.push([task, count, time + n]);
            }
        }
        
        if(cooldownQueue.length > 0 && cooldownQueue[0][2] <= time) {
            const [task, count, cooldown] = cooldownQueue.shift();
            maxPQ.push([count, task]);
        }

    }
    return time;
};