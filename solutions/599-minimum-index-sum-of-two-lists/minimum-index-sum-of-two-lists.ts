function findRestaurant(list1: string[], list2: string[]): string[] {

    let minIdxSum = Infinity;
    const res: string[] = [];

    const strToIdx1 = new Map<string, number>();
    for(let i = 0; i < list1.length; i += 1) {
        strToIdx1.set(list1[i], i);
    }

    for(let i = 0; i < list2.length; i += 1) {

        // common string
        if(strToIdx1.has(list2[i])) {

            const currIdxSum = i + strToIdx1.get(list2[i]);

            if(currIdxSum <= minIdxSum) {
                
                // If list is empty
                if(minIdxSum === Infinity) {
                    minIdxSum = currIdxSum;
                    res.push(list2[i]);
                } 
                // List is not empty, minSum is not Infinity
                else {
                    // currSum is strictly smaller than min so far
                    if(currIdxSum < minIdxSum) {
                        // remove all prev strings
                        while(res.length > 0) {
                            res.pop();
                        }
                        res.push(list2[i]);
                        minIdxSum = currIdxSum;
                    } 
                    // they are equal
                    else {
                        res.push(list2[i]);
                    }

                }

            }

        }

    }

    return res;
    
};