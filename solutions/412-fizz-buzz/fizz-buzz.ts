function fizzBuzz(n: number): string[] {

    const fizzBuzzHash = new Map<number, string>([
        [3, "Fizz"],
        [5, "Buzz"]
    ]);

    const res: string[] = [];

    for (let i = 1; i <= n; i += 1) {

        const ans: string[] = [];

        for(const key of fizzBuzzHash.keys()) {

            if(i % key === 0) {
                ans.push(fizzBuzzHash.get(key));
            }

        }

        if(ans.length === 0) {
            ans.push(`${i}`);
        }

        res.push(ans.join(""));

    }

    return res;
};