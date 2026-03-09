# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:

        if root is None:
            return []
        
        result = []
        list_queue = [[root]]

        while len(list_queue) > 0:

            curr_level_nodes = list_queue.pop()
            next_level_nodes = []
            curr_level_vals = []

            for node in curr_level_nodes:
                curr_level_vals.append(node.val)
                if node.left is not None:
                    next_level_nodes.append(node.left)
                if node.right is not None:
                    next_level_nodes.append(node.right)

            result.append(curr_level_vals)
            if len(next_level_nodes) > 0:
                list_queue.append(next_level_nodes)

        return result
        