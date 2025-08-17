class Twitter {
    currentTime: number;
    tweetsByUser: Map<number, [number, number][]>; // userId -> [tweetId, timestamp]
    userFollows: Map<number, Set<number>>;
    constructor() {
        this.currentTime = 0;
        this.tweetsByUser = new Map();
        this.userFollows = new Map();
    }

    postTweet(userId: number, tweetId: number): void {
        this.currentTime += 1;
        if(!this.tweetsByUser.has(userId)) {
            this.tweetsByUser.set(userId, []);
        }
        this.tweetsByUser.get(userId).push([tweetId, this.currentTime]);
    }

    getNewsFeed(userId: number): number[] {

        const res: number[] = [];

        // Make User Follow themselves
        if(!this.userFollows.has(userId)) {
            this.userFollows.set(userId, new Set());
        }
        this.userFollows.get(userId).add(userId);

        // Get the all followee IDs
        const followeeIds = this.userFollows.get(userId) || new Set();
        // Create new Priority Queue
        const maxPQ = new CustomMaxPriorityQueue<[number, number, number]>(); // tweetId, followeeId, nextOlderTweetIndex
        // Iterate over followee Ids
        for(const followeeId of followeeIds) {
            // check if they have tweets
            if(this.tweetsByUser.get(followeeId) !== undefined) {
                // get the tweets
                const tweets = this.tweetsByUser.get(followeeId);
                // Get the index of the most recent tweet (last element in array)
                const index = tweets.length - 1;
                // Extract the most recent tweet's data: [tweetId, timestamp]
                const [tweetId, timestamp] = tweets[index];
                // Push to max-heap: [tweetId, followeeId, nextOlderTweetIndex]
                // timestamp is used as priority (higher timestamp = more recent = higher priority)
                // nextIndex points to the next older tweet from this user (-1 from current)
                maxPQ.push([tweetId, followeeId, index - 1], timestamp);
            }
        }

        // Extract up to 10 most recent tweets using the max-heap
        while (maxPQ.length > 0 && res.length < 10) {
            // Pop the tweet with highest timestamp (most recent)
            const heapNode = maxPQ.pop()!;
            const [tweetId, followeeId, nextIndex] = heapNode.value;
            
            // Add this tweet ID to our result
            res.push(tweetId);
            
            // If there are more older tweets from this same user, add the next one to heap
            if (nextIndex >= 0) {
                // Get the next older tweet from this followee
                const [olderTweetId, olderTimestamp] = this.tweetsByUser.get(followeeId)[nextIndex];
                
                // Push the older tweet to heap: [olderTimestamp, olderTweetId, followeeId, nextIndex-1]
                // This ensures we continue processing tweets from this user in chronological order
                maxPQ.push([olderTweetId, followeeId, nextIndex - 1], olderTimestamp);
            }
        }
        
        // Return the array of up to 10 most recent tweet IDs
        return res;
    }

    follow(followerId: number, followeeId: number): void {
        if(!this.userFollows.has(followerId)) {
            this.userFollows.set(followerId, new Set());
        }
        this.userFollows.get(followerId).add(followeeId);
    }

    unfollow(followerId: number, followeeId: number): void {
        if(this.userFollows.has(followerId)) {
            this.userFollows.get(followerId).delete(followeeId);
        }
    }
}

class QueueNode<T> {
    value: T;
    priority: number;
    constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
    }
}

class CustomMaxPriorityQueue<T> {
    private data: QueueNode<T>[];
    public length: number;
    constructor() {
        this.data = [];
        this.length = 0;
    }
    push(val: T, priority: number):void {
        const newNode = new QueueNode(val, priority);
        this.data.push(newNode);
        this.length += 1;
        let currIdx = this.length - 1;
        this.siftUp(currIdx);
    }
    siftUp(idx: number): void {
        let currIdx = idx;
        let parentIdx = Math.floor((currIdx - 1)/2);
        while(currIdx > 0 && this.data[currIdx].priority > this.data[parentIdx].priority) {
            const temp = this.data[currIdx];
            this.data[currIdx] = this.data[parentIdx];
            this.data[parentIdx] = temp;
            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1)/2);
        }
    }
    pop():QueueNode<T> | null {
        if(this.length === 0) {
            return null;
        }
        if(this.length === 1) {
            this.length -= 1;
            return this.data.pop();
        }
        const max = this.data[0];
        this.data[0] = this.data.pop();
        this.length -= 1;
        this.siftDown(0);
        return max;
    }
    siftDown(idx: number): void {
        let currIdx = idx;
        while(currIdx < this.length - 1) {
            const leftChildIdx = currIdx * 2 + 1;
            const rightChildIdx = currIdx * 2 + 2;
            const leftChildPrio = this.data[leftChildIdx] === undefined ? -Infinity : this.data[leftChildIdx].priority;
            const rightChildPrio = this.data[rightChildIdx] === undefined ? -Infinity : this.data[rightChildIdx].priority;
            const biggerChildIdx = leftChildPrio > rightChildPrio ? leftChildIdx : rightChildIdx;
            const biggerChildPrio = leftChildPrio > rightChildPrio ? leftChildPrio : rightChildPrio;
            if(this.data[currIdx].priority < biggerChildPrio) {
                const temp = this.data[currIdx];
                this.data[currIdx] = this.data[biggerChildIdx];
                this.data[biggerChildIdx] = temp;
                currIdx = biggerChildIdx;
            } else {
                break;
            }
        }
    }
    peek():number | null {
        return this.length > 0 ? this.data[0].priority : null;
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