# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode], result: list[str] | None = None, curr_path: list[int] | None = None) -> List[str]:

        if result is None:
            result = []
        if curr_path is None:
            curr_path = []
        
        # Base Case
        if root is None:
            return result
        
        curr_path.append(root.val)

        if root.left is None and root.right is None:
            result.append("->".join(str(num) for num in curr_path))
        else:
            self.binaryTreePaths(root.left, result, curr_path)
            self.binaryTreePaths(root.right, result, curr_path)

        curr_path.pop()

        return result