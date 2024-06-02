import { Models } from "appwrite";
import { IExercises } from "./exercises.interface";

export interface IMyWorkouts extends Models.Document {
  userId: string;
  name: string;
  exercises: IExercises[];
  img: string;
}
