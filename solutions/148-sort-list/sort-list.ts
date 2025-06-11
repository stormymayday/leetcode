/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function sortList(head: ListNode | null): ListNode | null {
    if(!head || !head.next) {
        return head;
    }

    let left = head;
    let right = middleNode(head);
    const temp = right.next;
    right.next = null;
    right = temp;

    left = sortList(left);
    right = sortList(right);

    return mergeTwoLists(left, right);
};

function middleNode(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head.next; // Start fast one step ahead
    while(fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummyNode = new ListNode();
    let tail = dummyNode;
    let p1 = list1;
    let p2 = list2;
    while(p1 && p2) {
        if(p1.val < p2.val) {
            tail.next = p1;
            p1 = p1.next;
        } else {
            tail.next = p2;
            p2 = p2.next;
        }
        tail = tail.next;
    }
    if(p1) {
        tail.next = p1;
    }
    if(p2) {
        tail.next = p2;
    }
    return dummyNode.next;
};