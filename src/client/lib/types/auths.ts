
export interface User {
  id: string;
  email: string;
  walletAddress: string;
  name: string;
  role: 'investor' | 'founder' | 'admin';
  createdAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}