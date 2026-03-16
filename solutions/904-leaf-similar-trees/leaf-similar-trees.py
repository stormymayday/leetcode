# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        return self.dfs(root1) == self.dfs(root2)

    def dfs(self, root: TreeNode | None, result: list[int] | None = None) -> list[int]:
        if result is None:
            result = []
        if root is None:
            return result
        if root.left is None and root.right is None:
            result.append(root.val)
        self.dfs(root.left, result)
        self.dfs(root.right, result)
        return result
        