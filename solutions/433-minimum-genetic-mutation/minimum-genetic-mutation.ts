function minMutation(startGene: string, endGene: string, bank: string[]): number {

    const n = startGene.length;

    const bankSet = new Set<string>(bank);

    let queue: [string, number][] = [];
    queue.push([startGene, 0]);

    const visited = new Set<string>();
    visited.add(startGene);

    while(queue.length > 0) {
        
        const nextQueue: [string, number][] = [];
        for(let i = 0; i < queue.length; i += 1) {

            const [currGene, currDist] = queue[i];

            if(currGene === endGene) {
                return currDist;
            }

            // Generate neighbors: strings that differ by 1 character
            for(const neighbor of generateNeighbors(currGene, ['A', 'C', 'G', 'T'])) {

                if(bankSet.has(neighbor) && !visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextQueue.push([neighbor, currDist + 1]);
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

function generateNeighbors(gene: string, choices: string[]): string[] {
    const variants: string[] = [];
    const geneArray = gene.split('');
    
    for (let charIdx = 0; charIdx < geneArray.length; charIdx++) {
        const originalChar = geneArray[charIdx];
        
        for (const choice of choices) {
            if (originalChar === choice) {
                continue;
            }
            
            geneArray[charIdx] = choice;
            variants.push(geneArray.join(''));
            geneArray[charIdx] = originalChar;
        }
    }
    
    return variants;
}