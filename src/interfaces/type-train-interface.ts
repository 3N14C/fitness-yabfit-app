import { Models } from "appwrite";
import { IBaseWorkout } from "./base-wrokout-interface";

export interface ITypeTrain extends Models.Document {
  name: string;
  description: string;
  baseWorkout: IBaseWorkout[];
}
