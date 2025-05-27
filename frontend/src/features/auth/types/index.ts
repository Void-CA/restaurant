export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  user: User;
} 