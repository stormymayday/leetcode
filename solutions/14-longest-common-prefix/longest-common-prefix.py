class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        
        res = []

        for curr_char_idx, curr_char in enumerate(strs[0]):

            for i in range(1, len(strs)):
                curr_str = strs[i]

                if curr_char_idx >= len(curr_str) or curr_str[curr_char_idx] != curr_char:
                    return "".join(res)
            
            res.append(curr_char)

        return "".join(res)