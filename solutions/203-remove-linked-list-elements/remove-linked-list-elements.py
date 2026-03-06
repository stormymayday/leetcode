# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeElements(self, head: Optional[ListNode], val: int) -> Optional[ListNode]:
        
        dummy = ListNode()
        prev = dummy
        prev.next = head

        while head is not None:
            if head.val == val:
                prev.next = head.next
            else:
                prev = prev.next
            head = head.next

        return dummy.next