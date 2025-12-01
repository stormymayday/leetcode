function lengthOfLongestSubstringKDistinct(s: string, k: number): number {

  const charCount = new Map<string, number>();
  let longest = 0;
  let left = 0;
  for(let right = 0; right < s.length; right += 1) {

    // 1. always adding current char into the hash map
    charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);

    // 2. Shrink window if number of keys is greater than k
    while(charCount.size > k) {

        // 2.1. decrement count of char at 'left'
        charCount.set(s[left], charCount.get(s[left]) - 1);

        // 2.2. delete the entry if it's count reaches zero
        if(charCount.get(s[left]) === 0) {
            charCount.delete(s[left]);
        }

        // 2.3 advance 'left'
        left += 1;

    }

    // 3. Update longest if window is valid
    if(charCount.size <= k) {
        longest = Math.max(longest, right - left + 1);
    }

  }

  return longest;

};