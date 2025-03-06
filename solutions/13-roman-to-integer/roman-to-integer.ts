function romanToInt(s: string): number {
    // Map each Roman numeral character to its corresponding integer value
    const roman = {
        'I': 1,
        'V': 5, 
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
    }

     // Initialize the result (sum) at zero
    let result = 0;

    // Iterate through each character in the Roman numeral string
    for(let i = 0; i < s.length; i++) {
        const currentChar = s[i];
        const nextChar = s[i + 1];
        // Check if:
        // 1. There is a next character
        // 2. The current numeral's value is less than the next numeral's value
        if(nextChar !== undefined && roman[currentChar] < roman[nextChar]) {
            // If current < next, subtract current value
            result -= roman[currentChar];
        } else {
            // Otherwise, add the current value
            result += roman[currentChar];
        }
    }

    return result;
};