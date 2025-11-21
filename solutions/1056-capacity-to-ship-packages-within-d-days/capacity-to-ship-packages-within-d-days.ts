function shipWithinDays(weights: number[], days: number): number {

    // min capacity
    let left = Math.max(...weights);
    // max capacity
    let right = weights.reduce((acc, num) => acc + num, 0);
    let candidate = left;

    while (left <= right) {

        // current capacity
        const mid = left + Math.floor((right - left)/2);

        const daysRequiredWithGivenCapacity = daysRequired(weights, mid);

        // if daysRequired at current capacity exceed given number of days
        if(daysRequiredWithGivenCapacity > days) {
            // need to increase the capacity
            left = mid + 1;
        }
        // otherwise, daysRequired at current capacity are either below or equal to given number of days
        else {
            // potential candidate
            candidate = mid;
            // try to decrease the capacity
            right = mid - 1;
        }

    }

    return candidate;

};

function daysRequired(weights: number[], capacity: number): number {
    let days = 1; // staring with one
    let load = 0;
    for (let i = 0; i < weights.length; i += 1) {

        // current load + current wieght exceed the capacity
        if(load + weights[i] > capacity) {
            // go to the next day
            days += 1;
            // add the weight
            load = weights[i];
        } else {
            // otherwise, keep loading
            load += weights[i];
        }

    }

    return days;
}