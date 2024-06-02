import { Models } from "appwrite"

export interface IMuscle extends Models.Document {
    name: string
    img: string
}