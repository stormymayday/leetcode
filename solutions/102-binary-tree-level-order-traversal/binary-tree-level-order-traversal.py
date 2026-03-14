# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        
        result = []

        if root is None:
            return result

        my_stack = [[root]]

        while len(my_stack) > 0:
            curr_level_vals = []
            curr_level_nodes = my_stack.pop()
            next_level_nodes = []
            for node in curr_level_nodes:
                curr_level_vals.append(node.val)
                if node.left is not None:
                    next_level_nodes.append(node.left)
                if node.right is not None:
                    next_level_nodes.append(node.right)
            if len(next_level_nodes) > 0:
                my_stack.append(next_level_nodes)
            result.append(curr_level_vals)

        return result