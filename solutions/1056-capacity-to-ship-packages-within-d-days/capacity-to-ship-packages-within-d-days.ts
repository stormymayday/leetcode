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

function daysRequired(weights: number[], shipCapacity: number): number {
    let days = 0;
    let i = 0;
    while (i < weights.length) {

        let currCapacity = shipCapacity

        while (i < weights.length && weights[i] <= currCapacity) {
            currCapacity -= weights[i];
            i += 1;
        }
        days += 1

    }

    return days;
}