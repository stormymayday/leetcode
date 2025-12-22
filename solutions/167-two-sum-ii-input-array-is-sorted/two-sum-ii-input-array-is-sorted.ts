function twoSum(numbers: number[], target: number): number[] {

    const n = numbers.length;
    
    for(let i = 0; i < n - 1; i += 1) {

        for(let j = i + 1; j < n; j += 1) {

            if(numbers[i] + numbers[j] === target) {
                return [i + 1, j + 1];
            }

        }

    }

    return [-1, -1];

};