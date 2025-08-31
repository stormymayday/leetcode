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

        const allTweets: [number, number][] = [];
        // 1. Getting user tweets
        const userTweets: [number, number][] = this.tweetsBy.get(userId) || [];
        if (userTweets.length > 0) {
            allTweets.push(...userTweets);
        }

        // 2. Getting followee tweets
        const followeeIds = this.userFollows.get(userId) || new Set<number>();
        if (followeeIds.size > 0) {
            for (const followeeId of followeeIds) {
                const followeeTweets = this.tweetsBy.get(followeeId) || [];
                if (followeeTweets.length > 0) {
                    allTweets.push(...followeeTweets);
                }
            }
        }

        // 3. Sort all tweets by time
        const res: number[] = [];
        if (allTweets.length > 0) {
            allTweets.sort((a, b) => a[0] - b[0]);
            while (allTweets.length > 0) {
                const [time, tweetId] = allTweets.pop();
                res.push(tweetId);
                if(res.length === 10) {
                    break;
                }
            }
            return res;
        } else {
            return res;
        }

    }

    follow(followerId: number, followeeId: number): void {
        if (followerId !== followeeId) {
            if (!this.userFollows.has(followerId)) {
                this.userFollows.set(followerId, new Set<number>());
            }
            this.userFollows.get(followerId).add(followeeId);
        }
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