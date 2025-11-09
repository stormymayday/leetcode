/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {
	const wordMap = new Map();
	const set = new Set();
	const n = words.length;
	
	for (let i = 0; i < n; i++) {
		wordMap.set(words[i], i);
		set.add(words[i].length);
	}
	
    const lengths = Array.from(set).sort((a, b) => a - b);
	const ans = [];
	
	for(let i = 0; i < n; i++) {
		let length = words[i].length;
		
		if (length === 1) {
			if (wordMap.has("")) {
				ans.push([i, wordMap.get("")]);
				ans.push([wordMap.get(""), i]);
			} 
		} 
		
		else {
			const reverse = words[i].split("").reverse().join("");
			
			if (wordMap.has(reverse) && wordMap.get(reverse) != i)
				ans.push([i, wordMap.get(reverse)]);
			
			for (const k of lengths) {
				if (k === length)
					break;
				
				if (isPalindrome(reverse, 0, length - 1 - k)) {
					const s1 = reverse.substring(length - k);
					
					if (wordMap.has(s1))
						ans.push([i, wordMap.get(s1)]);
				}
				
				if (isPalindrome(reverse, k, length - 1)) {
					const s2 = reverse.substring(0, k);
					
					if (wordMap.has(s2))
						ans.push([wordMap.get(s2), i]);
				}
			}
		}
	}
	
	return ans;
};

var isPalindrome = function(s, left, right) {
	while (left < right)
		if (s[left++] !== s[right--])
			return false;
		
	return true;
};