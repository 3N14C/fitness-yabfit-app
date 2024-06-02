import { Models } from "appwrite";
import { IBaseWorkout } from "./base-wrokout-interface";

export interface IBaseWorkoutsExercises extends Models.Document {
  name: string;
  podhodi: string;
  povtoreniya: string;
  otdih: string;
  image: string;
  exID: string;
  baseWorkout: IBaseWorkout;
}
