function removeSubfolders(folder: string[]): string[] {

    const res: string[] = [];

    const root = new TrieNode();

    // Phase 1: filling the Trie
    for(let i = 0; i < folder.length; i += 1) {

        const parts = folder[i].split("/");

        let curr: TrieNode = root;

        for(let j = 0; j < parts.length; j += 1) {
            if(!curr.children.has(parts[j])) {
                curr.children.set(parts[j], new TrieNode());
            }
            curr = curr.children.get(parts[j]);
        }

        curr.isEnd = true;

    }

    // Phase 2: filter out the sub-folders
    for(let i = 0; i < folder.length; i += 1) {

        const parts = folder[i].split("/");

        let curr: TrieNode = root;

        for(let j = 0; j < parts.length; j += 1) {

            if(!curr.children.has(parts[j])) {
                break; // folder does not exist in the Trie
            } 
            // Otherwise, (potentially) the folder exists
            else {
                
                // Move to that node
                curr = curr.children.get(parts[j]);

                if( 
                    // If this node is the 'end'
                    curr.isEnd === true &&
                    // AND this is the 'last part' of the folder string
                    j === parts.length -1
                    ) {
                        // This is valid folder (not a sub-folder)
                        res.push(folder[i]);
                } else if(
                    // If this node is the 'end'
                    curr.isEnd === true &&
                    // AND this is NOT the 'last part' of the folder string
                    j < parts.length -1
                ) {
                    // This is a sub-folder
                    break;
                }
            }

        }

    }

    return res;
    
};

class TrieNode {
    children: Map<string, TrieNode>;
    isEnd: boolean;
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}