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
        const allTweets: [number, number][] = [];
        const userTweets: [number, number][] = this.tweetsBy.get(userId) || [];
        allTweets.push(...userTweets);
        const followeeIds: Set<number> = this.userFollows.get(userId) || new Set();
        for(const followeeId of followeeIds) {
            const followeeTweets: [number, number][] = this.tweetsBy.get(followeeId) || [];
            allTweets.push(...followeeTweets);
        }
        allTweets.sort((a, b) => a[1] - b[1]);
        const res: number[] = [];
        for(let i = allTweets.length - 1; i >= 0; i -= 1) {
            const [tweet, timestamp] = allTweets[i];
            res.push(tweet);
            if(res.length === 10) {
                break;
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

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */