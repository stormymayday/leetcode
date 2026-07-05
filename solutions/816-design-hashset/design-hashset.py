class ListNode:
    def __init__(self, val: int, next: ListNode | None = None):
        self.val = val
        self.next = next

class MyHashSet:

    def __init__(self):
        # initializing with dummy nodes
        self.set = [ListNode(0) for i in range(10**4)]
        
    def add(self, key: int) -> None:
        index = self.hash(key)
        # on a dummy node
        curr = self.set[index]
        while curr.next != None:
            if curr.next.val == key:
                return
            curr = curr.next
        curr.next = ListNode(key)
        return None
        
    def remove(self, key: int) -> None:
        index = self.hash(key)
        prev = self.set[index]
        curr = prev.next
        while curr != None:
            if curr.val == key:
                prev.next = curr.next
                curr.next = None
                return None
            prev = curr
            curr = curr.next
        return None 
        
    def contains(self, key: int) -> bool:
        index = self.hash(key)
        curr = self.set[index].next
        while curr != None:
            if curr.val == key:
                return True
            curr = curr.next
        return False
    
    def hash(self, key: int) -> int:
        return key % len(self.set)
        

# Your MyHashSet object will be instantiated and called as such:
# obj = MyHashSet()
# obj.add(key)
# obj.remove(key)
# param_3 = obj.contains(key)