import { Client, Databases, Storage, ID } from "appwrite"
import config from "../config"

interface CreateDocumentData {
  title: string;
  content: string;
  writer: string;
  image?: string;
}

interface UpdateDocumentData {
  title?: string;
  content?: string;
  writer?: string;
  image?: string;
}

interface DocumentResponse {
  $id: string;
  title: string;
  content: string;
  writer: string;
  [key: string]: any;
}

interface DocumentsListResponse {
  documents: DocumentResponse[];
  [key: string]: any;
}

const client = new Client()
  .setEndpoint(config.url)
  .setProject(config.id)

const database = new Databases(client)
const storage = new Storage(client)

const DocumentServices = {
  create: async ({ title, content, writer }: CreateDocumentData): Promise<DocumentResponse | any> => {
    try {
      return await database.createDocument(
        config.db_id,
        config.c_id,
        ID.unique(),
        {
          title,
          content,
          writer,
        }
      )
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : create ${error}`)
      return error
    }
  },

  update: async (docId: string, { title, content, writer, image }: UpdateDocumentData): Promise<DocumentResponse | any> => {
    try {
      return await database.updateDocument(
        config.db_id,
        config.c_id,
        docId,
        {
          title,
          content,
          writer,
          ...(image && { image })
        }
      )
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : update ${error}`)
      return error
    }
  },

  delete: async (docId: string): Promise<boolean> => {
    try {
      await database.deleteDocument(config.db_id, config.c_id, docId)
      return true
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : delete ${error}`)
      return false
    }
  },

  get: async (docId: string): Promise<DocumentResponse | any> => {
    try {
      return await database.getDocument(config.db_id, config.c_id, docId)
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : get ${error}`)
      return error
    }
  },

  gets: async (): Promise<DocumentsListResponse | any> => {
    try {
      return await database.listDocuments(config.db_id, config.c_id)
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : gets ${error}`)
      return error
    }
  },

  upload: async (file: File): Promise<any> => {
    try {
      return await storage.createFile(config.s_id, ID.unique(), file)
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : upload ${error}`)
      return error
    }
  },

  deleteStorage: async (fileId: string): Promise<boolean> => {
    try {
      await storage.deleteFile(config.s_id, fileId)
      return true
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : deleteStorage ${error}`)
      return false
    }
  },

  getPreview: (fileId: string): string | null => {
    try {
      const preview = storage.getFilePreview(config.s_id, fileId)
      console.log(preview)
      return preview
    } catch (error) {
      console.log(`ERROR : SERVICE DOCUMENT : getPreview ${error}`)
      return null
    }
  }
}

export default DocumentServices
