# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:
        result = -1

        if root is None:
            return result
        
        my_stack = [[root]]
        while len(my_stack) > 0:
            curr_level_nodes = my_stack.pop()
            next_level_nodes = []
            for node in curr_level_nodes:
                if node.left is not None:
                    next_level_nodes.append(node.left)
                if node.right is not None:
                    next_level_nodes.append(node.right)
            if len(next_level_nodes) > 0:
                my_stack.append(next_level_nodes)
            else:
                result = curr_level_nodes[0].val
        
        return result