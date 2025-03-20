function twoSum(numbers: number[], target: number): number[] {
    // Create a map to store previously seen numbers and their 1-based indices
    const hashMap = new Map<number, number>();

    // Iterate through the numbers array
    for (let i = 0; i < numbers.length; i++) {
        
        // Check if the difference (target - numbers[i]) exists in the map
        if (hashMap.has(target - numbers[i])) {
            // Return the 1-based indices of the pair
            return [hashMap.get(target - numbers[i])!, i + 1]; // Use `!` to assert that the value is non-null
        } else {
            // Store the number with its 1-based index in the map
            hashMap.set(numbers[i], i + 1);
        }
    }

    // If no valid pair is found, return an empty array
    return [];
}
