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
        const allTweets: [number, number][] = [];
        const userTweets = this.tweetsByUser.get(userId) || [];
        allTweets.push(...userTweets);
        const followeeIds = this.userFollows.get(userId) || new Set();
        for(const id of followeeIds) {
            const followeeTweets = this.tweetsByUser.get(id) || [];
            allTweets.push(...followeeTweets);
        }
        allTweets.sort((a, b) => a[1] - b[1]);
        const result: number[] = [];
        for(let i = allTweets.length - 1; i >= 0; i -= 1) {
            const [tweetId, timestamp] = allTweets[i];
            result.push(tweetId);
            if(result.length === 10) {
                break;
            }
        }
        return result;
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

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */