export class SocialMediaService {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    async fetchPosts() {
        return this.strategy.fetchPosts();
    }
}
