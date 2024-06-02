import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IBaseWorkoutsExercises } from "@/interfaces/base-workouts-exercises-interface";

interface IWorkoutCompletedStorage {
  workoutIds: string[];
  addWorkout: (id: string) => void;
  clearWorkouts: () => void;
}

export const useWorkoutStatus = create<IWorkoutCompletedStorage>()(
  devtools(
    persist(
      (set) => ({
        workoutIds: [],
        addWorkout: (id: string) => {
          set((state) => {
            const updatedWorkoutIds = state.workoutIds.includes(id)
              ? state.workoutIds.filter((existingId) => existingId !== id)
              : [...state.workoutIds, id];

            return {
              ...state,
              workoutIds: updatedWorkoutIds,
            };
          });
        },

        clearWorkouts() {
          set((state) => {
            return {
              ...state,
              workoutIds: [],
            };
          });
        },
      }),
      {
        name: "workout-status",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
