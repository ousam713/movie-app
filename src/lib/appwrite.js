const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

export const updateSearchCount = async () => {
  console.log(PROJECT_ID, DATABASE_ID, TABLE_ID);
}