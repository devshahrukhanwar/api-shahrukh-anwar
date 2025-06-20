import { SocialMediaStrategy } from "./SocialMediaStrategy";

export class SocialMediaService {
  private strategy: SocialMediaStrategy;

  constructor(strategy: SocialMediaStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SocialMediaStrategy) {
    this.strategy = strategy;
  }

  async fetchPosts() {
    return this.strategy.fetchPosts();
  }
}
