export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  stats: {
    posts: number;
    followers: number;
  };
}
