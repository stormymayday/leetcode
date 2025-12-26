function numJewelsInStones(jewels: string, stones: string): number {
    
    const jewelSet = new Set<string>(jewels);
    
    let count: number = 0;
    
    // for each stone
    for(let stone = 0; stone < stones.length; stone += 1) {

        // check if it is a jewel
        if(jewelSet.has(stones[stone])) {
            count += 1;
        }

    }

    return count;

};