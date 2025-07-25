function reverseWords(s: string): string {
    // split by spaces
    const arr = s.split(" ");
    const trimmed = [];
    for(let i = 0; i < arr.length; i += 1) {
        if(arr[i] !== "") {
            trimmed.push(arr[i]);
        }
    }
    let left = 0;
    let right = trimmed.length - 1;
    while(left < right) {
        // swap
        const temp = trimmed[left];
        trimmed[left] = trimmed[right];
        trimmed[right] = temp;

        // advance
        left += 1;
        right -= 1;
    }
    return trimmed.join(" ");
};