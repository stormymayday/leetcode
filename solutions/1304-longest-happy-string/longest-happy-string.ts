function longestDiverseString(a: number, b: number, c: number): string {
    
    // 1. Initialize a (naive) Priority Queue
    const maxPQ: [number, string][] = []; // [count, char];
    if(a > 0) {
        maxPQ.push([a, "a"]);
    }
    if(b > 0) {
        maxPQ.push([b, "b"]);
    }
    if(c > 0) {
        maxPQ.push([c, "c"]);
    }

    const res: string[] = [];
    
    while(maxPQ.length > 0) {

        maxPQ.sort((a, b) => b[0] - a[0]);

        let [topCount, topChar] = maxPQ.shift();

        if(res.length > 1 && res[res.length - 1] === topChar && res[res.length - 2] === topChar ) {

            if(maxPQ.length === 0) {
                break;
            } else {

                let [nextCount, nextChar] = maxPQ.shift();
                res.push(nextChar);
                nextCount -= 1;
                if(nextCount > 0) {
                    maxPQ.push([nextCount, nextChar]);
                }

            }
            
        } else {

            res.push(topChar);
            topCount -= 1;

        }

        if(topCount > 0) {
            maxPQ.push([topCount, topChar]);
        }

    }

    return res.join("");

};