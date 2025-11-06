function replaceWords(dictionary: string[], sentence: string): string {

    const arr = sentence.split(" ");

    const root = new TrieNode();
    for (let i = 0; i < dictionary.length; i += 1) {
        // going over each character in the word
        let curr: TrieNode = root;
        for (let j = 0; j < dictionary[i].length; j += 1) {
            if (!curr.children.has(dictionary[i][j])) {
                curr.children.set(dictionary[i][j], new TrieNode());
            }
            curr = curr.children.get(dictionary[i][j]);
        }
        curr.isWord = true;
        curr.word = dictionary[i];
    }


    for (let i = 0; i < arr.length; i += 1) {
        // going over each character in the word
        let curr: TrieNode = root;
        for (let j = 0; j < arr[i].length; j += 1) {
            if (!curr.children.has(arr[i][j])) {
                // word does not exist in the trie
                break; // break out of the inner loop on the next element
            }
            curr = curr.children.get(arr[i][j]);
            if(curr.isWord === true) {
                arr[i] = curr.word; // found shortest
                break; // break out of the inner loop on the next element
            }
        }
    }

    return arr.join(" ");

};

class TrieNode {
    children: Map<string, TrieNode>;
    isWord: boolean;
    word: string;
    constructor() {
        this.children = new Map();
        this.isWord = false;
        this.word = "";
    }
}