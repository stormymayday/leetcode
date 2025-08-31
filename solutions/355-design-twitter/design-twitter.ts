class Twitter {
    private tweetsBy: Map<number, [number, number][]>;
    private userFollows: Map<number, Set<number>>;
    private time: number;
    constructor() {
        this.tweetsBy = new Map();
        this.userFollows = new Map();
        this.time = 0;
    }

    postTweet(userId: number, tweetId: number): void {
        if (!this.tweetsBy.has(userId)) {
            this.tweetsBy.set(userId, []);
        }
        this.tweetsBy.get(userId).push([this.time, tweetId]);
        this.time += 1;
    }

    getNewsFeed(userId: number): number[] {
        
        // 1. Edge Case: Add user as it's own followee
        if(!this.userFollows.has(userId)) {
            this.userFollows.set(userId, new Set<number>());
        }
        this.userFollows.get(userId).add(userId);

        // 2. Get followeeIds
        const followeeIds = this.userFollows.get(userId);

        // 3. Initalize a (naive) Max Priority Queue
        const maxPQ: [number, number, number, number][] = []; // [timestamp, tweetId, userId, nextIndex]

        // 4. Loop over followees and get their latest tweet as well as index of next tweet (can be invalid)
        for(const followeeId of followeeIds) {

            const followeeTweets: [number, number][] = this.tweetsBy.get(followeeId) || [];

            if(followeeTweets.length > 0) {
                const [timestamp, tweetId] = followeeTweets[followeeTweets.length - 1];
                maxPQ.push([timestamp, tweetId, followeeId, followeeTweets.length - 2]);
            }

        }

        // 5. Get 10 latest tweets
        const res: number[] = [];
        while(maxPQ.length > 0) {
            // sort by timestamp descending
            maxPQ.sort((a, b) => b[0] - a[0]);
            
            const [timestamp, tweetId, userId, nextIndex] = maxPQ.shift();

            res.push(tweetId);

            if(res.length === 10) {
                break;
            }

            // Get that user's older tweet if nextIndex is valid and enqueue it
            if(nextIndex >= 0) {
                const [olderTimestamp, olderTweet] = this.tweetsBy.get(userId)[nextIndex];
                maxPQ.push([olderTimestamp, olderTweet, userId, nextIndex - 1]);
            }

        }
        return res;

    }

    follow(followerId: number, followeeId: number): void {
        if (!this.userFollows.has(followerId)) {
            this.userFollows.set(followerId, new Set<number>());
        }
        this.userFollows.get(followerId).add(followeeId);
    }

    unfollow(followerId: number, followeeId: number): void {
        if (this.userFollows.has(followerId)) {
            this.userFollows.get(followerId).delete(followeeId);
        }
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