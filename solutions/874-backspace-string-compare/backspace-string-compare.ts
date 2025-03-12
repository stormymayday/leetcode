function backspaceCompare(s: string, t: string): boolean {
    // Initialize pointers at the end of both strings
    let p1 = s.length - 1;
    let p2 = t.length - 1;
    
    // Continue until we've processed both strings completely
    while(p1 >= 0 || p2 >= 0) {
        // Check if either current character is a backspace
        if(s[p1] === '#' || t[p2] === '#') {
            // Handle backspace in string 's'
            if(s[p1] === '#') {
                // Set backcount to 2: 1 for the # itself and 1 for the character it should delete
                let backcount = 2;
                // Process characters until backcount is exhausted
                while(backcount > 0) {
                    // Move pointer left
                    p1--;
                    // Decrement backcount
                    backcount--;
                    // If we encounter another #, add 2 more to backcount
                    if(s[p1] === '#') {
                        backcount += 2;
                    }
                }
            }
            
            // Handle backspace in string 't' (same logic as above)
            if(t[p2] === '#') {
                let backcount = 2;
                while(backcount > 0) {
                    p2--;
                    backcount--;
                    if(t[p2] === '#') {
                        backcount += 2;
                    }
                }
            }
        } else {
            // If current characters don't match after processing backspaces, strings are not equal
            if(s[p1] !== t[p2]) {
                return false;
            } else {
                // Move both pointers left to continue comparison
                p1--;
                p2--;
            }
        }
    }
    
    // If we've processed both strings completely without finding a mismatch,
    // they are equal after applying backspaces
    return true;
}