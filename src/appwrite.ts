import { Account, Client, Databases } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "./constants/appwrite";

const client = new Client()

client.setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID)

export const account = new Account(client)
export const db = new Databases(client)

export {ID} from 'appwrite'