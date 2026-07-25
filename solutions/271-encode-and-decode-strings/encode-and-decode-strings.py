class Codec:
    def encode(self, strs: List[str]) -> str:
        """Encodes a list of strings to a single string.
        """

        n = len(strs)
        res = []

        for i in range(n):
            curr_str = strs[i]
            curr_n = len(curr_str)
            res.append(f"{curr_n}#{curr_str}")

        return "".join(res)
        

    def decode(self, s: str) -> List[str]:
        """Decodes a single string to a list of strings.
        """

        n = len(s)
        res = []

        i = 0
        while i < n:
            
            # string to generate
            curr = []

            # 'number' chars
            nums = []
            j = i
            while s[j] != '#':
                nums.append(s[j])
                j += 1
            
            num_chars = int("".join(nums))

            # 'j' is at '#' now, need to advance it
            j += 1
            while num_chars > 0:
                curr.append(s[j])
                num_chars -= 1
                j += 1
            
            res.append("".join(curr))

            i = j

        return res
        


# Your Codec object will be instantiated and called as such:
# codec = Codec()
# codec.decode(codec.encode(strs))