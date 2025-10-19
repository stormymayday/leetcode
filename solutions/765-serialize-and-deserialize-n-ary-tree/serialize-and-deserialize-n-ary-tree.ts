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

        const res: string[] = [];

        if(root === null) {
            return "";
        }

        function helperDFS(node: _Node | null): void {
            if(root === null) {
                return;
            }

            res.push(`${node.val}#${node.children.length}`);

            for(const child of node.children) {
                helperDFS(child);
            }

        }

        helperDFS(root);

        return res.join(",");
        
    };
	
    // Decodes your encoded data to tree.
    deserialize(data: string): _Node | null {

        if(data.length === 0) {
            return null;
        }

        const arr = data.split(",");
        let idx: number = 0;

        function helperDFS(): _Node | null {

            if(idx === arr.length) {
                return null;
            }

            const [val, numChildren] = arr[idx].split('#').map(Number);
            const node = new _Node(val);
            for(let i = 0; i < numChildren; i += 1) {
                idx += 1;
                node.children.push(helperDFS());
            }

            return node;

        }

        return helperDFS();
        
    };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));