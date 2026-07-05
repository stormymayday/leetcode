class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:

        pref = []
        
        for i in range(len(strs[0])):

            for j in range(1, len(strs)):
                if len(strs[j]) <= i or strs[0][i] != strs[j][i]:
                    return "".join(pref)
            pref.append(strs[0][i])

        return "".join(pref)