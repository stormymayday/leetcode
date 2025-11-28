function twoSum(numbers: number[], target: number): number[] {

    for(let i = 0; i < numbers.length - 1; i += 1) {
        for(let j = i + 1; j < numbers.length; j += 1) {

            if(numbers[i] + numbers[j] === target) {
                return [i + 1, j + 1];
            }

        }
    }
    
};