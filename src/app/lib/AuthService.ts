import { account, storage, ID, tableDb, BUCKET_ID } from "@/appwrite.config";

export type SignupData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: "User" | "admin";
  inviteToken?: string | null;
};

const COOKIE_NAMES = {
  loggedIn: "isLoggedIn",
  session: "app_session",
  role: "role",
};

function ensureEnv(name: string, value?: string | undefined) {
  if (!value) throw new Error(`${name} is not defined in environment variables`);
  return value;
}


function setCookie(name: string, value: string, days: number = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
 
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
  console.log(`Cookie set: ${name}=${value}`);
}

export async function signupService(formData: SignupData, image?: File | null) {

  ensureEnv("NEXT_PUBLIC_APPWRITE_DATABASE_ID", process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID);

 
  const acc = await account.create(ID.unique(), formData.email, formData.password, formData.name);
  let imageUrl = "";
  if (image) {
    try {
      const fileId = ID.unique();
      const uploadedFile = await storage.createFile(
        BUCKET_ID, 
        fileId,
        image
      );
      
      imageUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
      
      console.log("Image uploaded successfully:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      
    }
  }

  
  const rowResponse = await tableDb.createRow({
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    tableId: "profiletable",
    rowId: ID.unique(),
    data: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || "",
      role: formData.role || "User",
      profileImage: imageUrl, 
    },
  });

  
  return { account: acc, profileRow: rowResponse };
}

export async function loginService(email: string, password: string) {
  console.log("I am in Login service");
  
  const session = await account.createEmailPasswordSession(email, password);
  
  
  try {
    const profile = await tableDb.listRows({
      databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      tableId: "profiletable",
      queries: [`equal("email", "${email}")`],
    });
    
    const role = profile?.rows?.[0]?.role || "User";
    
    
    setCookie(COOKIE_NAMES.loggedIn, "1", 7);
    setCookie(COOKIE_NAMES.session, session.$id, 7);
    setCookie(COOKIE_NAMES.role, role, 7);
    
    console.log("Login cookies set - Role:", role, "Session:", session.$id);
    
   
    console.log("All cookies:", document.cookie);
  } catch (error) {
    console.error("Error fetching user role:", error);
    
    setCookie(COOKIE_NAMES.loggedIn, "1", 7);
    setCookie(COOKIE_NAMES.session, session.$id, 7);
    setCookie(COOKIE_NAMES.role, "User", 7);
  }
  
  return session;
}

export async function logoutService() {
  console.log("[AuthService] Starting logout...");
  
  try {
    
    await account.deleteSession("current");
    console.log("[AuthService] Appwrite session deleted");
  } catch (err) {
    console.error("[AuthService] Error deleting Appwrite session:", err);
  }

  
  const cookiesToClear = [COOKIE_NAMES.loggedIn, COOKIE_NAMES.session, COOKIE_NAMES.role];
  
  cookiesToClear.forEach(cookieName => {
    
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure`;
    console.log(`[AuthService] Cleared cookie: ${cookieName}`);
  });

  console.log("[AuthService] Logout complete");
}


export async function getAccount() {
  try {
    return await account.get();
  } catch (error) {
    console.error("[AuthService] Error getting account:", error);
    return null;
  }
}
