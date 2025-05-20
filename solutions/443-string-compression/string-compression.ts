function compress(chars: string[]): number {

    let index = 0;
    let i = 0;

    while (i < chars.length) {

        let j = i;

        // Count consecutive characters
        while (j < chars.length && chars[j] === chars[i]) {
            j++;
        }

        // Write the character
        chars[index] = chars[i];
        index++;

        // Write the count (only if > 1)
        if (j - i > 1) {
            const countStr = j - i + "";
            for (const digit of countStr) {
                chars[index] = digit;
                index++;
            }
        }

        i = j;

    }

    return index;
    
};