function strStr(haystack: string, needle: string): number {
    if (needle.length > haystack.length) {
        return -1;
    }

    if (!needle.length) {
        return 0;
    }

    for (let i = 0; i <= haystack.length - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
            if (needle[j] !== haystack[j + i]) {
                break;
            }

            if (j === needle.length - 1) {
                return i;
            }
        }
    }

    return -1;
}