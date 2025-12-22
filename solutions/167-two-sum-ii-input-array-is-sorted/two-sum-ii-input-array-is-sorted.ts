function twoSum(numbers: number[], target: number): number[] {

    const n = numbers.length;
    
    const hashMap = new Map<number, number>(); // key: number, val: index

    for(let i = 0; i < n; i += 1) {

        if(hashMap.has(target - numbers[i])) {
            return [hashMap.get(target - numbers[i]), i + 1];
        }

        hashMap.set(numbers[i], i + 1);


    }

    return [-1, -1];

};