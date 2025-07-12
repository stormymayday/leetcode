function partition(s: string): string[][] {
    const validPartitions: string[][] = [];
    const partitionInProgress: string[] = [];
    (function helper(buildPointer: number): void {
        // Base Case: current partitions are valid
        if(buildPointer === s.length) {
            validPartitions.push([...partitionInProgress]);
            return;
        }
        for(let i = buildPointer; i < s.length; i += 1) {
            const substring = s.substring(buildPointer, i + 1);
            if(isPalindrome(substring) === true) {
                partitionInProgress.push(substring);
                helper(i + 1);
                partitionInProgress.pop();
            }
        }
    }(0));
    return validPartitions;
};

function isPalindrome(s: string): boolean {
    let l = 0;
    let r = s.length - 1;
    while(l < r) {
        if(s[l] !== s[r]) {
            return false;
        }
        l += 1;
        r -= 1;
    }
    return true;
}