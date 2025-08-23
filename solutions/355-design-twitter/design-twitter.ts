class Twitter {
    tweetsBy: Map<number, [number, number][]>; // [tweetId, timestamp]
    userFollows: Map<number, Set<number>>;
    timestamp: number;
    constructor() {
        this.tweetsBy = new Map();
        this.userFollows = new Map();
        this.timestamp = 0;
    }

    postTweet(userId: number, tweetId: number): void {
        if(!this.tweetsBy.has(userId)) {
            this.tweetsBy.set(userId, []);
        }
        this.tweetsBy.get(userId).push([tweetId, this.timestamp]);
        this.timestamp += 1;
    }

    getNewsFeed(userId: number): number[] {
        if(!this.userFollows.has(userId)) {
            this.userFollows.set(userId, new Set());
        }
        this.userFollows.get(userId).add(userId);

        const followees: Set<number> = this.userFollows.get(userId);

        const maxPQ = new CustomMaxPriorityQueue<[number, number, number]>(); // val: [tweetId, userId, orderTweetIndex], prio: timestamp

        for(const followeeId of followees) {
            const followeeTweets: [number, number][] = this.tweetsBy.get(followeeId) || [];
            if(followeeTweets.length > 0) {
                const lastIndex = followeeTweets.length - 1;
                const [tweetId, timestamp] = followeeTweets[lastIndex];
                maxPQ.push([tweetId, followeeId, lastIndex - 1], timestamp);
            }
        }

        const res: number[] = [];
        while(maxPQ.length > 0) {
            const {val: [tweetId, userId, olderTweetIndex], prio: timestamp } = maxPQ.pop();
            res.push(tweetId);
            if(res.length === 10) {
                break;
            }
            if(olderTweetIndex >= 0) {
                const [olderTweetId, olderTimestamp] = this.tweetsBy.get(userId)[olderTweetIndex];
                maxPQ.push([olderTweetId, userId, olderTweetIndex - 1], olderTimestamp);
            }
        }
        return res;
    }

    follow(followerId: number, followeeId: number): void {
        if(followerId !== followeeId) {
            if(!this.userFollows.has(followerId)) {
                this.userFollows.set(followerId, new Set());
            }
            this.userFollows.get(followerId).add(followeeId);
        }
    }

    unfollow(followerId: number, followeeId: number): void {
        if(this.userFollows.has(followerId)) {
            this.userFollows.get(followerId).delete(followeeId);
        }
    }
}


class PriorityQueueNode<T> {
    val: T;
    prio: number;
    constructor(val: T, prio: number) {
        this.val = val;
        this.prio = prio;
    }
}

class CustomMaxPriorityQueue<T> {
    private data: PriorityQueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length  = 0;
    }
    push(val: T, prio: number): void {
        const newNode = new PriorityQueueNode<T>(val, prio);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / 2);
        while(currIdx > 0 && this.data[currIdx].prio > this.data[parentIdx].prio) {
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / 2);
        }
    }
    pop(): PriorityQueueNode<T> | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length = 0;
            return this.data.pop();
        }
        const root = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return root;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].prio;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].prio;
            const largerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const largerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].prio < largerChildPrio) {
                this.swap(currIdx, largerChildIdx);
                currIdx = largerChildIdx;
            } else {
                break;
            }
        }
    }
    heapify(vals: PriorityQueueNode<T>[]): void {
        this.data = [...vals];
        this.length = vals.length;
        let currIdx = Math.floor((this.length - 2) / 2);
        while(currIdx >= 0) {
            this.siftDown(currIdx);
            currIdx -= 1;
        }
    }
    top(): number | null {
        return this.length > 0 ? this.data[0].prio : null;
    }
    swap(idx1: number, idx2: number): void {
        const temp = this.data[idx1];
        this.data[idx1] = this.data[idx2];
        this.data[idx2] = temp;
    }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */