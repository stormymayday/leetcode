class ListNode:
    def __init__(self, key: int, val: int, next: ListNode | None = None):
        self.key = key
        self.val = val
        self.next = next

class MyHashMap:

    def __init__(self):
        # initiazling with dummy nodes
        self.hash_map = [ListNode(0, 0) for i in range(10**4)]
        

    def put(self, key: int, value: int) -> None:
        index = self.hash(key)
        # stating at the dummy node
        curr = self.hash_map[index]
        while curr.next != None:
            if curr.next.key == key:
                curr.next.val = value
                return None
            curr = curr.next
        curr.next = ListNode(key, value)
        return None

    def get(self, key: int) -> int:
        index = self.hash(key)
        curr = self.hash_map[index].next
        while curr != None:
            if curr.key == key:
                return curr.val
            curr = curr.next
        return -1

    def remove(self, key: int) -> None:
        index = self.hash(key)
        prev = self.hash_map[index]
        curr = prev.next
        while curr != None:
            if curr.key == key:
                prev.next = curr.next
                curr.next = None
                return None
            prev = curr
            curr = curr.next
        return None
    
    def hash(self, key: int) -> int:
        return key % len(self.hash_map)
        


# Your MyHashMap object will be instantiated and called as such:
# obj = MyHashMap()
# obj.put(key,value)
# param_2 = obj.get(key)
# obj.remove(key)