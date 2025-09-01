function lastStoneWeight(stones: number[]): number {

    const maxHeap: number[] = [...stones];

    while(maxHeap.length > 1) {
        maxHeap.sort((a, b) => b - a);

        const topStone = maxHeap.shift();
        const nextStone = maxHeap.shift();

        const result = topStone - nextStone;

        if(result > 0) {
            maxHeap.push(result);
        }

    }

    if(maxHeap.length > 0) {
        return maxHeap[0];
    } else {
        return 0;
    }
    
};