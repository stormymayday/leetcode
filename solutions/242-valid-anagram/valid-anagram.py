class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return self.char_count(s) == self.char_count(t)
        
    def char_count(self, s: str) -> dict:
        count = {}

        for char in s:
            if char not in count:
                count[char] = 0
            count[char] += 1

        return count