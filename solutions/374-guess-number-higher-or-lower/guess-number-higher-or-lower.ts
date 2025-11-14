/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */


function guessNumber(n: number): number {
    
    let left = 1;
    let right = n;

    while (left <= right) {

        const middle = left + Math.floor((right - left) / 2);

        // guess is lower than secret number
        if (guess(middle) === 1) {
            // discard left side
            left = middle + 1;
        }
        // guess is higher than secret number
        else if (guess(middle) === -1) {
            // discard right side
            right = middle - 1;
        } else {
            // middle is the secret number
            return middle
        }

    }
};