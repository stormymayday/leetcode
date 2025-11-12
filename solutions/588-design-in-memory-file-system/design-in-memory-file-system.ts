class FileSystem {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    ls(path: string): string[] {

        // Special Case: path is "/" root directory
        // (Not super necessary)
        // However, removes the need to filter out the empty strings after split
        // Because "/".split("/") -> ["", ""]
        if (path === "/") {
            return [...this.root.children.keys()].sort();
        }

        let curr: TrieNode = this.root;
        const pathParts = path.split("/");
        // After split first element is an empty string
        // Therefore, start iteration from 1
        for (let i = 1; i < pathParts.length; i += 1) {
            if (!curr.children.has(pathParts[i])) {
                return [];
            } else {
                curr = curr.children.get(pathParts[i]);
            }
        }
        // If it's a file
        if (curr.isFile === true) {
            // We need to get key / fileName
            // We can get it by accessing the last element of the 'pathParts'
            return [pathParts[pathParts.length - 1]];
        }
        // If it's a directory
        else {
            // perhaps we should store subdirectories as a sorted list
            // thus, there will be no need to gather keys and sort here
            return [...curr.children.keys()].sort();
        }
    }

    mkdir(path: string): void {
        let curr: TrieNode = this.root;
        const pathParts = path.split("/");
        // After split first element is an empty string
        // Therefore, start iteration from 1
        for (let i = 1; i < pathParts.length; i += 1) {
            if (!curr.children.has(pathParts[i])) {
                curr.children.set(pathParts[i], new TrieNode());
            }
            curr = curr.children.get(pathParts[i]);
        }
    }

    addContentToFile(filePath: string, content: string): void {
        let curr: TrieNode = this.root;
        const pathParts = filePath.split("/");
        // After split first element is an empty string
        // Therefore, start iteration from 1
        for (let i = 1; i < pathParts.length; i += 1) {
            if (!curr.children.has(pathParts[i])) {
                curr.children.set(pathParts[i], new TrieNode());
            }
            curr = curr.children.get(pathParts[i]);
        }
        // We are on file now
        curr.fileContent += content;
        curr.isFile = true;
    }

    readContentFromFile(filePath: string): string {
        let curr: TrieNode = this.root;
        const pathParts = filePath.split("/");
        // After split first element is an empty string
        // Therefore, start iteration from 1
        for (let i = 1; i < pathParts.length; i += 1) {
            if (!curr.children.has(pathParts[i])) {
                return ""; // shouldn't be necessary
            }
            curr = curr.children.get(pathParts[i]);
        }
        return curr.fileContent;
    }
}

class TrieNode {
    children: Map<string, TrieNode>;
    isFile: boolean;
    fileContent: string;
    constructor() {
        this.children = new Map();
        this.isFile = false;
        this.fileContent = "";
    }
}

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */