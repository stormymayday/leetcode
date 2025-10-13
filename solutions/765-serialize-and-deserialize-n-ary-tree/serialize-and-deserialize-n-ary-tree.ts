/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     
 *     constructor(v: number) {
 *         this.val = v;
 *         this.children = [];
 *     }
 * }
 */


class Codec {
  	constructor() {
        
    }
    
    // Encodes a tree to a single string.
    serialize(root: _Node | null): string {

        if(root === null) {
            return "";
        }

        const res: string[] = [];

        function preorderDFS(root): void {
            
            // Encode: value#numberOfChildren
            res.push(`${root.val}#${root.children.length}`);

            for(const child of root.children) {
                preorderDFS(child);
            }
            
        }

        preorderDFS(root);
        
        return res.join(",");

    };
	
    // Decodes your encoded data to tree.
    deserialize(data: string): _Node | null {

        if(data.length === 0) {
            return null;
        }

        // using 'reverse()' for efficiency of pop() O(1)
        const queue: string[] = data.split(",").reverse();

        function preorderDFS(queue: string[]): _Node | null {

            // if(queue.length === 0) {
            //     return null;
            // }

            const [val, numChildren] = queue.pop().split("#").map(Number);

            const root = new _Node(val);

            for(let i = 0; i < numChildren; i += 1) {
                root.children.push(preorderDFS(queue));
            }

            return root;

        }

        return preorderDFS(queue);
        
    };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));