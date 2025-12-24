function findRestaurant(list1: string[], list2: string[]): string[] {

    let minIdxSum = Infinity;
    const res: string[] = [];

    // Phase 1: populate the hashmap using 'list1'
    const strToIdx1 = new Map<string, number>();
    for(let i = 0; i < list1.length; i += 1) {
        strToIdx1.set(list1[i], i);
    }

    // Phase 2: iterate over 'list2'
    for(let i = 0; i < list2.length; i += 1) {

        // common string
        if(strToIdx1.has(list2[i])) {

            const currIdxSum = i + strToIdx1.get(list2[i]);

            // current index sum is smaller than or equals to minSum
            if(currIdxSum <= minIdxSum) {
                
                // If list is empty (minSum is Infinity)
                if(minIdxSum === Infinity) {
                    // push string and update min
                    res.push(list2[i]);
                    minIdxSum = currIdxSum;
                } 
                // List is not empty, (minSum is not Infinity)
                else {
                    // currSum is strictly smaller than minSum
                    if(currIdxSum < minIdxSum) {
                        // remove all prev strings
                        while(res.length > 0) {
                            res.pop();
                        }
                        // push string and update min
                        res.push(list2[i]);
                        minIdxSum = currIdxSum;
                    } 
                    // they are equal
                    else {
                        // add string
                        res.push(list2[i]);
                    }

                }

            }

        }

    }

    return res;
    
};