function isValid(s: string): boolean {
    if (s.length === 0) {
        return true;
    }

    if (s.length === 1) {
        return false;
    }

    const stack = [];

    for (let i = 0; i < s.length; i++) {
        const currentBracket = s[i];

        if (
            currentBracket === "(" ||
            currentBracket === "{" ||
            currentBracket === "["
        ) {
            stack.push(currentBracket);
        } else if (
            (currentBracket === "}" ||
                currentBracket === ")" ||
                currentBracket === "]") &&
            stack.length === 0
        ) {
            return false;
        } else if (
            (currentBracket === "}" ||
                currentBracket === ")" ||
                currentBracket === "]") &&
            stack.length !== 0
        ) {
            const poppedBracket = stack.pop();

            if (
                (poppedBracket === "(" && currentBracket !== ")") ||
                (poppedBracket === "{" && currentBracket !== "}") ||
                (poppedBracket === "[" && currentBracket !== "]")
            ) {
                return false;
            }
        }
    }

    return stack.length === 0 ? true : false;
}