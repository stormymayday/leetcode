function countComponents(n: number, edges: number[][]): number {
    const roots: number[] = [];
    const sizes: number[] = [];
    for(let i = 0; i < n; i += 1) {
        roots.push(i);
        sizes.push(1);
    }
    for(const edge of edges) {
        const [a, b] = edge;
        union(roots, sizes, a, b);
    }
    let count = 0;
    for(let i = 0; i < roots.length; i += 1) {
        if(roots[i] === i) {
            count += 1;
        }
    }
    return count;
};

function union(roots: number[], sizes: number[], nodeA: number, nodeB: number): void {
    const rootA = find(roots, nodeA);
    const rootB = find(roots, nodeB);

    if(rootA === rootB) {
        return;
    }

    if(sizes[rootA] >= sizes[rootB]) {
        roots[rootB] = rootA;
        sizes[rootA] += sizes[rootB];
    } else {
        roots[rootA] = rootB;
        sizes[rootB] += sizes[rootA];
    }
}

function find(roots: number[], src: number):number {
    if(roots[src] === src) {
        return src;
    }
    const found = find(roots, roots[src]);
    roots[src] = found;
    return found;
}