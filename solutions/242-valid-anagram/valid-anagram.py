class Solution:
    def isAnagram(self, s: str, t: str) -> bool:

        if len(s) != len(t):
            return False
        
        freqMap = {}

        # Filling in the hash map using 's'
        for char in s:
            if char not in freqMap:
                freqMap[char] = 0
            freqMap[char] += 1

        # 'Emptying' the hash map using 't'
        for char in t:
            if char not in freqMap:
                return False
            freqMap[char] -= 1
            if freqMap[char] == 0:
                del freqMap[char]

        return len(freqMap) == 0
        # return True
