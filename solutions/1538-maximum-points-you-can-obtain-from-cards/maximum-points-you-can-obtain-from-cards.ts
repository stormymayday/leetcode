function maxScore(cardPoints: number[], k: number): number {

    let max = 0;
    
    let left = 0;
    let leftSum = 0;
    let right = cardPoints.length - 1;
    let rightSum = 0;

    // Part 1: leftSum
    while(left < cardPoints.length && left < k) {
        leftSum += cardPoints[left];
        left += 1;
    }
    // Note: left we might need bring 'left' back a bit
    if(left === k) {
        left -= 1;
    }

    max = Math.max(max, leftSum);

    // Part 2: shrink left & expand right
    while(left >= 0) {

        leftSum -= cardPoints[left];
        left -= 1;

        rightSum += cardPoints[right];
        right -= 1;

        max = Math.max(max, leftSum + rightSum);

    }

    return max;

};