interface Config {
  url: string;
  id: string;
  db_id: string;
  c_id: string;
  s_id: string;
}

const config: Config = {
  url: String(import.meta.env.VITE_URL),
  id: String(import.meta.env.VITE_ID),
  db_id: String(import.meta.env.VITE_DATABASE_ID),
  c_id: String(import.meta.env.VITE_COLLECTION_ID),
  s_id: String(import.meta.env.VITE_STORAGE_ID)
}

export default config;