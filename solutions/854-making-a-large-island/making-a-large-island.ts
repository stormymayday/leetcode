function largestIsland(grid: number[][]): number {

    const n = grid.length;
    
    // Step 1: Initialize UnionFind and Union adjacent 1s in the grid
    const uf = new UnionFind(n*n);
    for(let row = 0; row < n; row += 1) {
        for(let col = 0; col < n; col += 1) {
            if(grid[row][col] === 1) {
                const directions: [number, number][] = [
                    [-1, 0], // up
                    [0, 1], // right
                    [1, 0], // down
                    [0, -1], // left
                ];
                for(const [rowDelta, colDelta] of directions) {
                    const neighborRow = row + rowDelta;
                    const neighborCol = col + colDelta;
                    if(
                        // out of bounds check
                        0 <= neighborRow && neighborRow < n &&
                        0 <= neighborCol && neighborCol < n &&
                        // land check
                        grid[neighborRow][neighborCol] === 1
                    ) {
                        // Flatten 2D index to 1D using:
                        // Row Major Order formula: index = (row * numCols) + col
                        const currCellIdx = (row * n) + col;
                        const neighborCellIdx = (neighborRow * n) + neighborCol;
                        uf.union(currCellIdx, neighborCellIdx);
                    }
                }
            }
        }
    }

    // Step 2: Calculate the maximum possible island size
    let maxIslandSize = 0;
    let hasZeros = false; // handle the edge case where there are no zeroes in the grid
    for(let row = 0; row < n; row += 1) {
        for(let col = 0; col < n; col += 1) {
            if(grid[row][col] === 0) {
                hasZeros = true;
                let currentIslandSize = 1; // flipping zero to 1 at this cell
                const rootsUsed = new Set<number>(); // to avoid re-adding same islands
                const directions: [number, number][] = [
                    [-1, 0], // up
                    [0, 1], // right
                    [1, 0], // down
                    [0, -1], // left
                ];
                for(const [rowDelta, colDelta] of directions) {
                    const neighborRow = row + rowDelta;
                    const neighborCol = col + colDelta;
                    // Using Row Major Order formula: index = (row * numCols) + col to flatten 2D index to 1D
                    const neighborCellIdx = (neighborRow * n) + neighborCol;
                    const neighborCellRoot = uf.find(neighborCellIdx);
                    if(
                        // out of bounds check
                        0 <= neighborRow && neighborRow < n &&
                        0 <= neighborCol && neighborCol < n &&
                        // land check
                        grid[neighborRow][neighborCol] === 1 &&
                        // check if we added this island already
                        !rootsUsed.has(neighborCellRoot)
                    ) {
                        rootsUsed.add(neighborCellRoot);
                        currentIslandSize += uf.getSize(neighborCellRoot);
                    }
                }
                maxIslandSize = Math.max(maxIslandSize, currentIslandSize);
            }
        }
    }

    // If there are no zeros, the largest island is the entire grid
    if(hasZeros === false) {
        return n*n;
    } else {
        return maxIslandSize;
    }

};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    private numComponents: number;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        this.numComponents = n;
        for(let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number): number {
        const root = this.roots.get(x);
        if(root !== x) {
            this.roots.set(x, this.find(root));
        }
        return this.roots.get(x);
    }
    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if(rootX === rootY) {
            return false;
        } else {
            if(this.sizes.get(rootX) >= this.sizes.get(rootY)) {
                this.roots.set(rootY, rootX);
                this.sizes.set(rootX, this.sizes.get(rootX) + this.sizes.get(rootY));
            } else {
                this.roots.set(rootX, rootY);
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootX));
            }
            this.numComponents -= 1;
            return true;
        }
    }
    getNumComponents() {
        return this.numComponents;
    }
    getSize(x: number): number {
        return this.sizes.get(x);
    }
}