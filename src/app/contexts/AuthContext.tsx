"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account, tableDb } from "@/appwrite.config";
import { Query } from "appwrite";
import { useRouter } from "next/navigation";

type User = {
  $id: string;
  email: string;
  name: string;
  role: string;
  profileImage?: string; 
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      console.log("AuthContext: Checking user...");
      const accountData = await account.get();
      console.log("AuthContext: Account data:", accountData);

      let role = "User"; 

      try {
       
        const profile = await tableDb.listRows({
          databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          tableId: "profiletable",
          queries: [Query.equal("email", accountData.email)],
        });

        console.log("AuthContext: Profile data:", profile);
        role = profile?.rows?.[0]?.role || "User";
        console.log("AuthContext: User role:", role);
        
       
        const profileImage = profile?.rows?.[0]?.profileImage;
        
        setUser({
          $id: accountData.$id,
          email: accountData.email,
          name: accountData.name,
          role,
          profileImage, 
        });
      } catch (roleError) {
        console.warn("AuthContext: Could not fetch role, using default:", roleError);
       
        setUser({
          $id: accountData.$id,
          email: accountData.email,
          name: accountData.name,
          role,
        });
      }
      console.log("AuthContext: User set successfully");
    } catch (error: any) {
      
      if (error?.code !== 401) {
        console.log("AuthContext: Unexpected error:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
      console.log("AuthContext: Loading complete");
    }
  };

  const login = async (email: string, password: string) => {
    try {
   
      await account.createEmailPasswordSession(email, password);

    
      const accountData = await account.get();

   
      const profile = await tableDb.listRows({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        tableId: "profiletable",
        queries: [Query.equal("email", email)],
      });

      const role = profile?.rows?.[0]?.role || "User";
      const profileImage = profile?.rows?.[0]?.profileImage; 

      setUser({
        $id: accountData.$id,
        email: accountData.email,
        name: accountData.name,
        role,
        profileImage, 
      });

       // Cookies for middleware

       document.cookie = `token=${accountData.$id}; path=/; max-age=86400`;
       document.cookie = `role=${role}; path=/; max-age=86400`;

      const variationRole = role.toLowerCase();
      if (variationRole === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/destinations");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      document.cookie = `token=; path=/; max-age=0`;
      document.cookie = `role=; path=/; max-age=0`;
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const refreshUser = async () => {
    await checkUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
