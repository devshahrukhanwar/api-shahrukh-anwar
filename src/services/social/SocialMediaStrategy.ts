export interface SocialMediaStrategy {
  fetchPosts(): Promise<any[]>;
}
