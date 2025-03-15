function numJewelsInStones(jewels: string, stones: string): number {
    // Create a Set from the 'jewels' string for quick lookup (O(1) average time complexity)
    const set = new Set(jewels);

    // Initialize a counter to track the number of jewel stones found
    let count = 0;

    // Iterate through each stone in the 'stones' string
    for (const stone of stones) {
        // Check if the current stone exists in the 'jewels' set
        if (set.has(stone)) {
            // If it is a jewel, increment the count
            count++;
        }
    }

    // Return the total count of stones that are jewels
    return count;
}
