// const { SocialMediaStrategy } = require("./SocialMediaStrategy");

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
}

module.exports = { SocialMediaService };
