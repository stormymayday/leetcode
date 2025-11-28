function twoSum(numbers: number[], target: number): number[] {

    const hashMap = new Map<number, number>();
    for(let i = 0; i < numbers.length; i += 1) {
        hashMap.set(numbers[i], i);
    }

    for(let i = 0; i < numbers.length; i += 1) {
        if(hashMap.has(target - numbers[i]) && hashMap.get(target - numbers[i]) !== i) {
            return [i + 1, hashMap.get(target - numbers[i]) + 1];
        }
    }
    
};