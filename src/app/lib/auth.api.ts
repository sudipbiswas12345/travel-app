import { account, ID } from "@/appwrite.config";

/* ================================
   REGISTER USER
================================ */
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const user = await account.create(
      ID.unique(),
      data.email,
      data.password,
      data.name
    );

   
    await loginUser({
      email: data.email,
      password: data.password,
    });

    return user;
  } catch (error) {
    console.error("REGISTER ERROR", error);
    throw error;
  }
}

/* ================================
   LOGIN USER
================================ */
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  try {
    return await account.createEmailPasswordSession(
      data.email,
      data.password
    );
  } catch (error) {
    console.error("LOGIN ERROR", error);
    throw error;
  }
}

/* ================================
   LOGOUT USER
================================ */
export async function logoutUser() {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.error("LOGOUT ERROR", error);
    throw error;
  }
}

/* ================================
   GET CURRENT USER
   ================================ */
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
   
    return null;
  }
}

/* ================================
   CHECK AUTH STATUS
================================ */
export async function isLoggedIn() {
  try {
    await account.get();
    return true;
  } catch {
    return false;
  }
}
