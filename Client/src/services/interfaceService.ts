interface UserData {
  fullname?: string;
  picture?: string;
  username?: string;
  password?: string;
  email?: string;
  f_name?: string;
  l_name?: string;
  _id?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  username: string;
  _id: string;
  accessToken: string;
  refreshToken: string;
  f_name?: string;
  l_name?: string;
  email?: string;
  picture?: string;
}
interface postData {
  _id: string;
  picture: string;
  description: string;
  title: string;
  likes: string[];
  category: string;
  phone: string;
  region: string;
  city: string;
  user: string;
}

export type { UserData, LoginCredentials, AuthResponse, postData };
