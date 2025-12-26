function numJewelsInStones(jewels: string, stones: string): number {
    
    let count = 0;
    
    // for each stone
    for(let stone = 0; stone < stones.length; stone += 1) {

        // check if it is a jewel
        for(let jewel = 0; jewel < jewels.length; jewel += 1) {

            if(stones[stone] === jewels[jewel]) {
                count += 1;
            }

        }

    }

    return count;

};