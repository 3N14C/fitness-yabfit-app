import { Models } from "appwrite";
import { ISubcategory } from "./subcategory.interface";

export interface ICategory extends Models.Document {
  name: string;
  image: string;
  count: number;
  subcategory: ISubcategory[];
}
