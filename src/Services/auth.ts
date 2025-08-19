import { Account, Client, ID } from "appwrite"
import config from "../config"

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserAccount {
  $id: string;
  email: string;
  name: string;
  [key: string]: any;
}

interface Session {
  $id: string;
  [key: string]: any;
}

const client = new Client()
client
  .setEndpoint(config.url)
  .setProject(config.id)
const account = new Account(client)

const AuthServices = {
  Sign_Up: async ({ email, password, name }: SignUpData): Promise<UserAccount | any> => {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return await AuthServices.Login({ email, password });
      }
    }
    catch (error) {
      console.log(`ERROR : SERVICE AUTH.TS : createAccount ${error}`);
      return error;
    }
  },
  Login: async ({ email, password }: LoginData): Promise<Session | any> => {
    try {
      return await account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`ERROR : SERVICE AUTH.JS : login ${error}`)
      return error;
    }
  },
  Current_User: async (): Promise<UserAccount | any> => {
    try {
      return await account.get()
    } catch (error) {
      console.log(`ERROR : SERVICE AUTH.JS : currrentUser ${error}`);
      return error;
    }
  },
  Logout: async (): Promise<void | any> => {
    try {
      await account.deleteSessions();
    } catch (error) {
      console.log(`ERROR : SERVICE AUTH.JS : logout ${error}`);
      return error;
    }
  }
}

export default AuthServices