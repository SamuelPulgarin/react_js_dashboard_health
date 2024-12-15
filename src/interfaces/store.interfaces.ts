import { Models } from "appwrite";

export interface AuthState {
    email: string;
    password: string;
    user: any;
    loggedInUser: any;
    loading: boolean;
    error: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    login: (email: string, password: string) => Promise<Models.User<Models.Preferences> | null>;
    logout: () => Promise<void>;
    checkUserSession: () => Promise<void>;
}
