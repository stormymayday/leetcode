function mySqrt(x: number): number {

    let candidate = 0;

    for(let i = 1; i * i <= x; i += 1) {

        candidate = i;

    }

    return candidate;
    
};