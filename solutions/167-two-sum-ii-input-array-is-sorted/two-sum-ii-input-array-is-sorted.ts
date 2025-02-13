function twoSum(numbers: number[], target: number): number[] {

    if(!numbers.length) {
        return [];
    }

    let i = 0;
    let j = numbers.length - 1;

    while(i < j) {

        if(numbers[i] + numbers[j] === target) {
            return [i + 1,  j + 1];
        } else if(numbers[i] + numbers[j] > target) {
            j--;
        } else {
            i++;
        }
 
    }

    return [];
    
};