export interface User {
  wallet: string;
  role: "investor" | "startup" | "both";
  createdAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  name: string;
  bio?: string;
  avatar?: string;
  website?: string;
  twitter?: string;
}
