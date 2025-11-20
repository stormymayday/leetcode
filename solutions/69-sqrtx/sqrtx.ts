function mySqrt(x: number): number {

    let candidate = 0;

    for(let i = 1; i <= x; i += 1) {
        
        const sqrt = i * i;

        if(sqrt > x) {
            break;
        }

        candidate = i;

    }

    return candidate;
    
};