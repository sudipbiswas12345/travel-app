"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  getAccount,
  loginService,
  logoutService,
  SignupData,
  signupService,
} from "./AuthService";

import { tableDb } from "@/appwrite.config";
import { Query } from "appwrite";


// -----------------------------
// SIGNUP HOOK
// -----------------------------
export function useSignup() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ formData, image }: { formData: SignupData; image?: File | null }) =>
      signupService(formData, image),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}


// -----------------------------
// LOGIN HOOK
// -----------------------------
export function useLogin() {
  const qc = useQueryClient();
  const router = useRouter();

  console.log("I am in userLogin");
  
  return useMutation({
  
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginService(email, password),

    onSuccess: async (_, variables) => {
      console.log("I am on success");
      await qc.invalidateQueries({ queryKey: ["currentUser"] });

      
      const accountData = await getAccount();
      if (!accountData) {
        window.location.href = "/auth/login";
        return;
      }

     
      const profile = await tableDb.listRows({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        tableId: "profiletable",
        queries: [Query.equal("email", variables.email)],

      });

      console.log({profile});
      

      const role = profile?.rows?.[0]?.role || "User";
      console.log({role});
      

      
      
     
      await new Promise(resolve => setTimeout(resolve, 100));
      if (role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/destinations";
      }
    },
  });
}


// -----------------------------
// LOGOUT HOOK
// -----------------------------
export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => logoutService(),

    onSuccess: async () => {
      console.log("Logout successful, clearing cache and redirecting...");
      await qc.invalidateQueries({ queryKey: ["currentUser"] });
      qc.clear(); 
      window.location.href = "/auth/login";
    },
  });
}

// -----------------------------
// CURRENT USER FETCHER
// -----------------------------
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const acc = await getAccount();

      if (!acc) {
        console.log("NO SESSION");
        return null;
      }

      const profileRes = await tableDb.listRows({
        databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        tableId: "profiletable",
        queries: [Query.equal("email", acc.email)],
      });

      return {
        id: acc.$id,
        name: acc.name,
        email: acc.email,
        role: profileRes.rows?.[0]?.role || "User",
      };
    },
    retry: false,
    staleTime: 0,
  });
}
