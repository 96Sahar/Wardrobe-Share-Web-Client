export interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
  stats: {
    posts: number;
  };
}
