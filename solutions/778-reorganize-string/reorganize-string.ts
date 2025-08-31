function reorganizeString(s: string): string {
    
    // 1. Frequency count hash map
    const freqMap = new Map<string, number>();
    for(let i = 0; i < s.length; i += 1) {
        freqMap.set(s[i], (freqMap.get(s[i]) || 0) + 1);
    }

    // 2. Initialzie a (naive) Priority Queue
    const maxPQ: [number, string][] = [];
    for(const [char, count] of freqMap.entries()) {
        maxPQ.push([count, char]);
    }

    const res: string[] = [];
    while(maxPQ.length > 1) {

        maxPQ.sort((a, b) => b[0] - a[0]);

        let [topCount, topChar] = maxPQ.shift();
        let [nextCount, nextChar] = maxPQ.shift();
        res.push(topChar);
        topCount -= 1;
        if(topCount > 0) {
            maxPQ.push([topCount, topChar]);
        }
        res.push(nextChar);
        nextCount -= 1;
        if(nextCount > 0) {
            maxPQ.push([nextCount, nextChar]);
        }
    }
    if(maxPQ.length === 0) {
        return res.join("");
    } else {
        const [topCount, topChar] = maxPQ.pop(); // lol
        if(topCount > 1) {
            return "";
        } else {
            res.push(topChar);
            return res.join("");
        }
    }
};