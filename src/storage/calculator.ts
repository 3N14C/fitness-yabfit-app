import { IUser } from "@/interfaces/user.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IData {
  user: IUser;
  formula: {
    carbohydrates: number;
    protein: number;
    fats: number;
    calories: number;
  };
}

interface ICalculatorStore {
  data: IData;
  setData: (data: IData) => void;
}

export const useFormula = create<ICalculatorStore>()(
  devtools(
    persist(
      (set) => ({
        data: {
          user: {
            name: "",
            email: "",
            id: "",
          },
          formula: {
            carbohydrates: 0,
            protein: 0,
            fats: 0,
            calories: 0,
          },
        },
        setData: (data) => set(() => ({ data })),
      }),

      { name: "formula", storage: createJSONStorage(() => AsyncStorage) }
    )
  )
);
