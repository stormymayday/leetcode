function romanToInt(s: string): number {
    // Map each Roman numeral character to its corresponding integer value
    const roman = {
        'I': 1,    // 1
        'V': 5,    // 5
        'X': 10,   // 10
        'L': 50,   // 50
        'C': 100,  // 100
        'D': 500,  // 500
        'M': 1000, // 1000
    }

     // Initialize the result (sum) at zero
    let result = 0;

    // Iterate through each character in the Roman numeral string
    for(let i = 0; i < s.length; i++) {
        // Check if:
        // 1. There is a next character (i+1 < s.length)
        // 2. The current numeral's value is less than the next numeral's value
        if(i + 1 < s.length && roman[s[i]] < roman[s[i+1]]) {
            // If current < next, subtract current value
            result -= roman[s[i]];
        } else {
            // Otherwise, add the current value
            result += roman[s[i]];
        }
    }

    return result;
};