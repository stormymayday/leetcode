function accountsMerge(accounts: string[][]): string[][] {
    const uf = new UnionFind(accounts.length);

    // 1. Map each email to account index
    const emailToAccount = new Map<string, number>();
    for(let accIndex = 0; accIndex < accounts.length; accIndex += 1) {
        // Start from index 1 to skip the name (index 0)
        for(let emailIndex = 1; emailIndex < accounts[accIndex].length; emailIndex += 1) {
            // If this email was added before
            // Then it must belong to the same account (current index and one added before)
            if(emailToAccount.has(accounts[accIndex][emailIndex])) {
                // Union the accounts using indices
                uf.union(accIndex, emailToAccount.get(accounts[accIndex][emailIndex]));
            } else {
                // Otherwise, add the email and account index
                emailToAccount.set(accounts[accIndex][emailIndex], accIndex);
            }
        }
    }

    // 2. Iterate over 'emailToAccount' and map (unique) accounts to their emails
    const accIndexToEmails = new Map<number, string[]>();
    for(const [email, accIndex] of emailToAccount.entries()) {
        const rootAccIndex = uf.find(accIndex);
        if(!accIndexToEmails.has(rootAccIndex)) {
            accIndexToEmails.set(rootAccIndex, []);
        }
        accIndexToEmails.get(rootAccIndex).push(email);
    }

    // 3. Iterate over 'accIndexToEmails' and fill up the result sorting the emails
    const result: string[][] = [];
    for(const [accIndex, emails] of accIndexToEmails.entries()) {
        result.push(
            [accounts[accIndex][0], ...emails.sort()]
        );
    }
    return result;
};

class UnionFind {
    private roots: Map<number, number>;
    private sizes: Map<number, number>;
    constructor(n: number) {
        this.roots = new Map();
        this.sizes = new Map();
        for(let i = 0; i < n; i += 1) {
            this.roots.set(i, i);
            this.sizes.set(i, 1);
        }
    }
    find(x: number):number {
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
            return true;
        }
    }
}