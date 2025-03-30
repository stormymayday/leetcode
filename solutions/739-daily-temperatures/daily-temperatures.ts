function dailyTemperatures(temperatures: number[]): number[] {

    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = [];

    for(let i = n - 1; i >= 0; i--) {

        const temperature = temperatures[i];
        const day = i;

        if(stack.length === 0) {

            stack.push([temperature, day]);

        } else {

            while(stack.length !== 0 && stack[stack.length - 1][0] <= temperature) {
                stack.pop();
            }

            if(stack.length !== 0 && stack[stack.length - 1][0] > temperature) {

                result[i] = stack[stack.length - 1][1] - day;

            }

            stack.push([temperature, day]);

        }

    }

    return result;
    
};