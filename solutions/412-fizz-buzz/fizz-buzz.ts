function fizzBuzz(n: number): string[] {

    const res: string[] = [];

    for (let i = 1; i <= n; i += 1) {

        const ans: string[] = [];

        if(i % 3 === 0) {
            ans.push("Fizz");
        }

        if(i % 5 === 0) {
            ans.push("Buzz");
        }

        if(ans.length === 0) {
            ans.push(`${i}`);
        }

        res.push(ans.join(""));

    }

    return res;
};