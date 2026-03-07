# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:

        result = []
        self.helper(root, result)
        return result
        
    def helper(self, node: Optional[TreeNode], vals: List[int]):
        if node is None:
            return
        vals.append(node.val)
        self.helper(node.left, vals)
        self.helper(node.right, vals)    