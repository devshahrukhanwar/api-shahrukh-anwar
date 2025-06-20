import { SocialMediaStrategy } from "./SocialMediaStrategy";

export class TwitterService implements SocialMediaStrategy {
  async fetchPosts(): Promise<any[]> {
    // Placeholder: Replace with real Twitter API logic
    return [
      { id: 1, content: "Hello from Twitter!" },
      { id: 2, content: "Another tweet." },
    ];
  }
}
