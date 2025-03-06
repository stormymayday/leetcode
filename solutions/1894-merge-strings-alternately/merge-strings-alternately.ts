function mergeAlternately(word1: string, word2: string): string { 
    // Initialize an empty string 'result' to store the merged string.
    let result = ""; 
    
    // Initialize two pointers, 'p1' for word1 and 'p2' for word2.
    let p1 = 0; 
    let p2 = 0; 
    
    // Continue looping as long as both pointers are within the bounds of the strings.
    while (p1 < word1.length && p2 < word2.length) { 
        
        // Add the character from word1 at position 'p1' to the result.
        result += word1[p1]; 
        // Increment the pointer for word1.
        p1++; 
        
        // Add the character from word2 at position 'p2' to the result.
        result += word2[p2]; 
        // Increment the pointer for word2.
        p2++; 
        
    }

    // If there are any remaining characters in word1, append them to the result.
    if (p1 < word1.length) { 
        
        result += word1.slice(p1); 
    }

    // If there are any remaining characters in word2, append them to the result.
    if (p2 < word2.length) { 
        
        result += word2.slice(p2); 
    }

    // Return the merged string.
    return result; 
    
}
