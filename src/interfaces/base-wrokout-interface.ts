import { Models } from "appwrite";
import { ITypeTrain } from "./type-train-interface";
import { IBaseWorkoutsExercises } from "./base-workouts-exercises-interface";

export interface IBaseWorkout extends Models.Document {
  name: string;
  description: string;
  typesTrain: ITypeTrain;
  baseWorkoutEx: IBaseWorkoutsExercises[];
}
