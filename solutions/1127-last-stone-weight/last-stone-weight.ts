function lastStoneWeight(stones: number[]): number {
    stones.sort((a, b) => a - b);
    while(true) {
        if(stones.length > 1) {
            const x = stones.pop();
            const y = stones.pop();
            stones.push(Math.abs(x-y));
            stones.sort((a,b) => a - b);
        } else if(stones.length === 1) {
            return stones.pop();
        } else {
            return 0;
        }
    }
};