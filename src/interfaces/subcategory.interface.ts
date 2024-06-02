import { Models } from "appwrite";
import { IExercises } from "./exercises.interface";

export interface ISubcategory extends Models.Document {
  name: string;
  image: string;
  exercises: IExercises[];
}
