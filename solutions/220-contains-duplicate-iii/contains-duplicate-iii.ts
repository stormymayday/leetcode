function containsNearbyAlmostDuplicate(nums: number[], indexDiff: number, valueDiff: number): boolean {
    const avlTree = new AVLTree();

    for (let i = 0; i < nums.length; i++) {
        // Check floor: largest value <= nums[i]
        const floor = avlTree.floor(nums[i]);
        if (floor !== null && nums[i] - floor <= valueDiff) {
            return true;
        }

        // Check ceiling: smallest value >= nums[i]
        const ceiling = avlTree.ceiling(nums[i]);
        if (ceiling !== null && ceiling - nums[i] <= valueDiff) {
            return true;
        }

        // Add current element
        avlTree.insert(nums[i]);

        // Maintain window size
        if (i >= indexDiff) {
            avlTree.remove(nums[i - indexDiff]);
        }
    }

    return false;
}

class AVLNode {
    key: number;
    left: AVLNode | null;
    right: AVLNode | null;
    height: number;

    constructor(key: number) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1; // New node is at height 1
    }
}

class AVLTree {
    root: AVLNode | null;

    constructor() {
        this.root = null;
    }

    // Get height of node
    private getHeight(node: AVLNode | null): number {
        return node === null ? 0 : node.height;
    }

    // Get balance factor of node
    private getBalance(node: AVLNode | null): number {
        return node === null ? 0 : this.getHeight(node.left) - this.getHeight(node.right);
    }

    // Update height of node
    private updateHeight(node: AVLNode): void {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    // Right rotation
    private rotateRight(y: AVLNode): AVLNode {
        const x = y.left!;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    // Left rotation
    private rotateLeft(x: AVLNode): AVLNode {
        const y = x.right!;
        const T2 = y.left;

        // Perform rotation
        y.left = x;
        x.right = T2;

        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    // Insert a key
    insert(key: number): void {
        this.root = this.insertHelper(this.root, key);
    }

    private insertHelper(node: AVLNode | null, key: number): AVLNode {
        // Standard BST insertion
        if (node === null) {
            return new AVLNode(key);
        }

        if (key < node.key) {
            node.left = this.insertHelper(node.left, key);
        } else if (key > node.key) {
            node.right = this.insertHelper(node.right, key);
        } else {
            // Duplicate keys not allowed, just return
            return node;
        }

        // Update height
        this.updateHeight(node);

        // Get balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && key < node.left!.key) {
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && key > node.right!.key) {
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left!.key) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right!.key) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Remove a key
    remove(key: number): void {
        this.root = this.removeHelper(this.root, key);
    }

    private removeHelper(node: AVLNode | null, key: number): AVLNode | null {
        // Standard BST deletion
        if (node === null) {
            return null;
        }

        if (key < node.key) {
            node.left = this.removeHelper(node.left, key);
        } else if (key > node.key) {
            node.right = this.removeHelper(node.right, key);
        } else {
            // Node to be deleted found
            if (node.left === null || node.right === null) {
                node = node.left !== null ? node.left : node.right;
                if (node === null) return null;
            } else {
                // Node with two children: get inorder successor
                let successor = node.right;
                while (successor.left !== null) {
                    successor = successor.left;
                }
                node.key = successor.key;
                node.right = this.removeHelper(node.right, successor.key);
            }
        }

        // Update height
        this.updateHeight(node);

        // Get balance factor
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Find ceiling (smallest key >= target)
    ceiling(target: number): number | null {
        let curr: AVLNode | null = this.root;
        let result: number | null = null;

        while (curr !== null) {
            if (curr.key === target) {
                return curr.key;
            } else if (curr.key > target) {
                result = curr.key;
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }

        return result;
    }

    // Find floor (largest key <= target)
    floor(target: number): number | null {
        let curr: AVLNode | null = this.root;
        let result: number | null = null;

        while (curr !== null) {
            if (curr.key === target) {
                return curr.key;
            } else if (curr.key < target) {
                result = curr.key;
                curr = curr.right;
            } else {
                curr = curr.left;
            }
        }

        return result;
    }
}