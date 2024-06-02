import { Models } from "appwrite";
import { IMuscle } from "./muscle.interface";

export interface IExercises extends Models.Document {
  name: string;
  description: string;
  img: string[];
  muscles: IMuscle[];
  technics: string;
  mistakes: string;
}
