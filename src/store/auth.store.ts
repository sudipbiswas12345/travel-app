import {create} from "zustand";
import { account } from "@/appwrite.config";
import Cookies from "js-cookie";

type User = { $id: string; email?: string; name?: string; [k:string]: any } | null;

type AuthState = {
  user: User;
  setUser: (u: User) => void;
  logout: () => Promise<void>;
  fetchSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => {
    set({ user: u });
    if (u) Cookies.set("travelly_session", u.$id, { expires: 7 });
  },
  logout: async () => {
    try {
      await account.deleteSession("current");
    } catch (e) { /* ignore */ }
    Cookies.remove("travelly_session");
    set({ user: null });
  },
  fetchSession: async () => {
    try {
      const user = await account.get();
      set({ user });
    } catch (e) {
      set({ user: null });
    }
  },
}));
