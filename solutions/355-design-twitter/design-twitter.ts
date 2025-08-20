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
        const allTweets: [number, number][] = [];
        const userTweets: [number, number][] = this.tweetsByUser.get(userId) || [];
        allTweets.push(...userTweets);
        const followeeIds: Set<number> = this.userFollowees.get(userId) || new Set<number>();
        for(const followeeId of followeeIds) {
            const followeeTweets: [number, number][] = this.tweetsByUser.get(followeeId) || [];
            allTweets.push(...followeeTweets);
        }
        allTweets.sort((a, b) => a[1] - b[1]);
        const res: number[] = [];
        for(let i = allTweets.length - 1; i >= 0; i -= 1) {
            const [tweet, time] = allTweets[i];
            res.push(tweet);
            if(res.length === 10) {
                break;
            }
        }
        return res;
    }

    follow(followerId: number, followeeId: number): void {
        if(followerId !== followeeId) {
            if(!this.userFollowees.has(followerId)) {
                this.userFollowees.set(followerId, new Set());
            }
            this.userFollowees.get(followerId).add(followeeId);
        }
    }

    unfollow(followerId: number, followeeId: number): void {
        if(this.userFollowees.has(followerId)) {
            this.userFollowees.get(followerId).delete(followeeId);
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