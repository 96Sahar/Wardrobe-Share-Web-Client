interface UserData {
  fullname?: string;
  picture?: string | File | unknown;
  username?: string;
  password?: string;
  email?: string;
  f_name?: string;
  l_name?: string;
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
  f_name: string;
  l_name: string;
  email: string;
  picture: string;
}
interface postData {
  title: string;
  description: string;
  image: string;
  category: string;
  phone: string;
  region: string;
  city: string;
}

export type { UserData, LoginCredentials, AuthResponse, postData };
