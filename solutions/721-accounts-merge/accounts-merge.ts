function accountsMerge(accounts: string[][]): string[][] {

    // 1. Initialzing UnionFind using the accounts.length
    const n = accounts.length;
    const uf = new UnionFind(n);

    // 2. Map each email to account index and perform 'union' (MERGE) where necessary
    const emailToAccIdx = new Map<string, number>();
    // 2.1. Iterating over every account
    for(let accIdx = 0; accIdx < n; accIdx += 1) {
        // 2.2 For each account, iterating over every email (skipping index 0 'name')
        for(let emailIdx = 1; emailIdx < accounts[accIdx].length; emailIdx += 1) {
            const currEmail = accounts[accIdx][emailIdx];
            // 2.2.1. If we see the email for the first time
            // Set it's account index to current 'accIdx'
            if(!emailToAccIdx.has(currEmail)) {
                emailToAccIdx.set(currEmail, accIdx);
            }
            // Otherwise, perform a union between current 'accIdx' and the the account index the emails belongs to
            // THIS IS THE MERGE STEP
            else {
                uf.union(accIdx, emailToAccIdx.get(currEmail));
            }
        }
    }

    // 3. Using 'emailToAccIdx' map, create a reverse mapping of account index to all all (MEGED) emails
    const accIdxToMergedEmails = new Map<number, string[]>;
    for(const [email, accIdx] of emailToAccIdx.entries()) {
        // PREVIOUS MISTAKE: need to get root
        const root = uf.find(accIdx);
        if(!accIdxToMergedEmails.has(root)) {
            accIdxToMergedEmails.set(root, []);
        }
        accIdxToMergedEmails.get(root).push(email);
    }

    // 4. Using 'accIdxToMergedEmails', Create the result
    const res: string[][] = [];
    for(const [accIdx, emails] of accIdxToMergedEmails.entries()) {
        // 4.1. Grab the account name, list of emails and sort the emails
        const accName = accounts[accIdx][0];
        const listOfEmails = emails.sort();
        // 4.2 Push both to the result
        res.push([accName, ...listOfEmails]);
    }
    return res;
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
                this.sizes.set(rootX, this.sizes.get(rootY) + this.sizes.get(rootX));
            } else {
                this.roots.set(rootX, rootY);
                this.sizes.set(rootY, this.sizes.get(rootY) + this.sizes.get(rootX));
            }
            this.numComponents -= 1;
            return true;
        }
    }
}