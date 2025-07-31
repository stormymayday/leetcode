function countComponents(n: number, edges: number[][]): number {
    const roots: number[] = [];
    const heights: number[] = [];
    for(let i = 0; i < n; i += 1) {
        roots.push(i);
        heights.push(1);
    }
    for(const edge of edges) {
        const [a, b] = edge;
        union(roots, heights, a, b);
    }
    let count = 0;
    for(let i = 0; i < n; i += 1) {
        if(roots[i] === i) {
            count += 1;
        }
    }
    return count;
};

// Union by Height
function union(roots: number[], heights: number[], a: number, b: number):void {
    const rootA = find(roots, a);
    const rootB = find(roots, b);
    if(rootA !== rootB) {
        if(heights[rootA] > heights[rootB]) {
            roots[rootB] = rootA;
        } else if(heights[rootB] > heights[rootA]) {
            roots[rootA] = rootB;
        } else {
            roots[rootA] = rootB;
            heights[rootB] += 1;
        }
    }
}

function find(roots: number[], node: number): number {
    if(roots[node] === node) {
        return node;
    }
    const root = find(roots, roots[node]);
    roots[node] = root; // path compression
    return root;
}