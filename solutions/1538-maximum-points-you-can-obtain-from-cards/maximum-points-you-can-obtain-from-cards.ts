function maxScore(cardPoints: number[], k: number): number {

    let left = 0;
    let leftSum = 0;
    let right = cardPoints.length - 1;
    let rightSum = 0;
    let maxSum = 0;

    while (left < k) {
        leftSum += cardPoints[left];
        left += 1;
    }
    left -= 1;
    maxSum = Math.max(maxSum, leftSum);

    while (left >= 0) {
        leftSum -= cardPoints[left];
        left -= 1;

        rightSum += cardPoints[right];
        right -= 1;

        maxSum = Math.max(maxSum, leftSum + rightSum);
    }

    return maxSum;

};