function fizzBuzz(n: number): string[] {
    const result = [];

    let i = 1;

    while(i <= n) {

        if(i % 5 === 0 && i % 3 === 0) {
            result.push("FizzBuzz");
        } else if(i % 5 === 0) {
            result.push("Buzz");
        } else if(i % 3 === 0) {
            result.push("Fizz");
        } else {
            result.push(`${i}`);
        }

        i++;
    }

    return result;
};