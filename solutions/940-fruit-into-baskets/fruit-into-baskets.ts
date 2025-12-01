function totalFruit(fruits: number[]): number {

    // key is the 'number/fruit'
    // value is the count of that fruit in the current 'window'
    // size of the map should not exceed 2!
    const fruitCount = new Map<number, number>();

    let longestWindow = 0;

    let left = 0;
    for (let right = 0; right < fruits.length; right += 1) {

        // always add
        fruitCount.set(fruits[right], (fruitCount.get(fruits[right]) || 0) + 1);

        // Dragging Left
        if (fruitCount.size > 2) {
            // decrement count for the fruit at 'left' pointer
            fruitCount.set(fruits[left], fruitCount.get(fruits[left]) - 1);
            if (fruitCount.get(fruits[left]) === 0) {
                // if fruit count reaches zero, delete it
                fruitCount.delete(fruits[left]);
            }
            left += 1; // advance 'left'
        }


        // Update max length if the window is valid
        if (fruitCount.size <= 2) {
            longestWindow = Math.max(longestWindow, right - left + 1);
        }

    }

    return longestWindow;

};