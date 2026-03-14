# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:

        result: list[list[int]] = []

        if root is None:
            return result

        my_stack: list[tuple(TreeNode, int)] = [(root, 0)]

        while len(my_stack) > 0:
            curr_node, curr_node_level = my_stack.pop()          
            if len(result) == curr_node_level:
                result.append([])
            result[curr_node_level].append(curr_node.val)
            if curr_node.right is not None:
                my_stack.append((curr_node.right, curr_node_level + 1))
            if curr_node.left is not None:
                my_stack.append((curr_node.left, curr_node_level + 1))
        
        return result        