import { account } from '@/lib/appwrite/config';

export const authService = {

  login: async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return user;
    } catch (err: any) {
      throw new Error('Failed to sign in. Verify your credentials.');
    }
  },
  getUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (err) {
      throw new Error('No user session found.');
    }
  },
  logout: async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      throw new Error('Failed to log out.');
    }
  },
};
