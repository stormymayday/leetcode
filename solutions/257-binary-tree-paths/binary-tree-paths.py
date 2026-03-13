# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def binaryTreePaths(self, root: Optional[TreeNode]) -> List[str]:

        result = []

        if root is None:
            return result
        
        def backtrack(node: Optional[TreeNode], curr_path: list[TreeNode] | None = None) -> None:
            
            if node is None:
                return
            
            if curr_path is None:
                curr_path = []
            
            curr_path.append(node.val)

            if node.left is None and node.right is None:
                result.append("->".join(str(val) for val in curr_path))
            else:
                backtrack(node.left, curr_path)
                backtrack(node.right, curr_path)
            
            curr_path.pop()
            

        backtrack(root, [])

        return result
        