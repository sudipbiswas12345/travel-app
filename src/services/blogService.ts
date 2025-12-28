import { databases,BLOGS_COLLECTION_ID,DATABASE_ID, ID  } from "@/appwrite.config";


export const getBlogs = async () => {
  const res = await databases.listDocuments(DATABASE_ID , BLOGS_COLLECTION_ID);
  return res.documents;
};

export const getBlogById = async (id: string) => {
  return databases.getDocument(DATABASE_ID , BLOGS_COLLECTION_ID, id);
};


export const createBlog = async (data: any) => {
  return databases.createDocument(
    DATABASE_ID,
    BLOGS_COLLECTION_ID,
    ID.unique(),
    data
  );
};



export async function deleteBlog(blogId: string) {
  await databases.deleteDocument(DATABASE_ID!, BLOGS_COLLECTION_ID!, blogId);
}
