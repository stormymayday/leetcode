function nextGreatestLetter(letters: string[], target: string): string {

    const targetCharCode: number = target.charCodeAt(0) - "a".charCodeAt(0);

    let left: number = 0;
    let right: number = letters.length - 1;
    let candidate: number = 0;

    while(left <= right) {
        
        const mid: number = left + Math.floor((right - left) / 2);
        const CharCodeAtMid: number = letters[mid].charCodeAt(0) - "a".charCodeAt(0); 

        // If charCode at mid is greater than charCode at target
        if(CharCodeAtMid > targetCharCode) {
            // Update the candidate
            candidate = mid;
            // discard the right side (go left)
            right = mid - 1;
        } 
        // Otherwise, if charCode at mid is less than OR equals to charCOde at target
        else {
            // go right
            left = mid + 1;
        }

    }

    return letters[candidate];
    
};