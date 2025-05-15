export type UserDataProfile = {
  publicId: number;
  name: string;
  username: string;
  email: string;
  profilePictureUrl?: string | null;
  birthDate?: string | null;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | null;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: string | null;
};