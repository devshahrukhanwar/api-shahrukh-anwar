class SocialMediaService {
  strategy;

  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async fetchPosts() {
    return this.strategy.fetchPosts();
  }

  async fetchDummyPosts() {
    return this.strategy.fetchDummyPosts();
  }
}

module.exports = { SocialMediaService };
