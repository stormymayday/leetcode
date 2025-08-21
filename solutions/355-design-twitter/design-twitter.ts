class Twitter {
    tweetsByUser: Map<number, [number, number][]>; // userId -> List([tweetId, time])
    userFollowees: Map<number, Set<number>>; // userId -> Set(userIds)
    time: number;
    constructor() {
        this.tweetsByUser = new Map();
        this.userFollowees = new Map();
        this.time = 0;
    }

    postTweet(userId: number, tweetId: number): void {
        if(!this.tweetsByUser.has(userId)) {
            this.tweetsByUser.set(userId, []);
        }
        this.tweetsByUser.get(userId).push([tweetId, this.time]);
        this.time += 1;
    }

    getNewsFeed(userId: number): number[] {
        // Make User Follow themselves
        if(!this.userFollowees.has(userId)) {
            this.userFollowees.set(userId, new Set());
        }
        this.userFollowees.get(userId).add(userId);

        const maxPQ = new CustomMaxPriorityQueue<[number, number, number]>(); // val: [tweetId, userId, index], prio: time
        // Iterate over all the followees, get their latest tweet, and push it to the priority queue
        for(const followeeId of this.userFollowees.get(userId)) {
            // get the tweets
            const tweets = this.tweetsByUser.get(followeeId) || [];
            // get the latest tweet if it exists
            if(tweets.length > 0) {
                const [latestTweet, time] = tweets[tweets.length - 1];
                // push it to the priority queue with previous index
                maxPQ.push([latestTweet, followeeId, tweets.length - 2], time);
            }
        }
        
        // Generate the result
        const res: number[] = [];
        while(maxPQ.length > 0 && res.length < 10) {
            const {val, prio} = maxPQ.pop();
            const [tweetId, followeeId, prevIdx] = val;
            res.push(tweetId);
            // fetch older tweet by that user if index is valid
            if(prevIdx >= 0) {
                const [olderTweetId, time] = this.tweetsByUser.get(followeeId)[prevIdx];
                // push it to the priority queue with previous index
                maxPQ.push([olderTweetId, followeeId, prevIdx - 1], time);
            }
             
        }
        return res;

    }

    follow(followerId: number, followeeId: number): void {
        // if(followerId !== followeeId) {
            if(!this.userFollowees.has(followerId)) {
                this.userFollowees.set(followerId, new Set());
            }
            this.userFollowees.get(followerId).add(followeeId);
        // }
    }

    unfollow(followerId: number, followeeId: number): void {
        if(this.userFollowees.has(followerId)) {
            this.userFollowees.get(followerId).delete(followeeId);
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