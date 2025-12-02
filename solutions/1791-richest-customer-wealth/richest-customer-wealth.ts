function maximumWealth(accounts: number[][]): number {
    let max = 0;
    for(let row = 0; row < accounts.length; row += 1) {

        let rowSum = 0;

        for(let col = 0; col < accounts[row].length; col += 1 ) {
            rowSum += accounts[row][col];
        }

        max = Math.max(max, rowSum);

    }
    return max;
};