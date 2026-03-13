# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:

        result = []

        def backtrack_helper(node: Optional[TreeNode], curr_path: list[int]) -> None:
            if node is None:
                return
            curr_path.append(node.val)
            if node.left is None and node.right is None:
                result.append("->".join(str(num) for num in curr_path))
            else:
                backtrack_helper(node.left, curr_path)
                backtrack_helper(node.right, curr_path)
            curr_path.pop()

        backtrack_helper(root, [])

        return result