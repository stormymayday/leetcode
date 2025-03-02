function concatenatedBinary(n: number): number {
    const MOD = 10n**9n + 7n;
    let result = 0n;
    
    for (let i = 1; i <= n; i++) {
        const bitLength = BigInt(Math.floor(Math.log2(i)) + 1);
        result = ((result << bitLength) + BigInt(i)) % MOD;
    }
    
    return Number(result);
}