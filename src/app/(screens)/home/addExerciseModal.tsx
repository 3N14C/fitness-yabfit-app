import { db } from "@/appwrite";
import { Accordion } from "@/components/Accordion";
import { CustomButton } from "@/components/CustomButton";
import {
  DATABASE_ID,
  COLLECTION_MYWORKOUTS,
  COLLECTION_CATEGORY,
} from "@/constants/appwrite";
import { ICategory } from "@/interfaces/category.interface";
import { IExercises } from "@/interfaces/exercises.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ID, Query } from "appwrite";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

const Modal = () => {
  const { userWorkoutId } = useGlobalSearchParams<{ userWorkoutId: string }>();

  const { data: category } = useQuery<ICategory[]>({
    queryKey: ["category"],
    queryFn: async (): Promise<ICategory[] | any> => {
      return (await db.listDocuments(DATABASE_ID, COLLECTION_CATEGORY))
        .documents;
    },
  });

  const [myWorkouts, setMyWorkouts] = useState([]);

  const { mutateAsync } = useMutation({
    mutationKey: ["addToMyWorkouts"],
    mutationFn: async () => {
      const myWorkoutsIds = myWorkouts.map((myWorkout) => myWorkout.$id);
      return await db.updateDocument(
        DATABASE_ID,
        COLLECTION_MYWORKOUTS,
        userWorkoutId,
        {
          exercises: myWorkoutsIds,
        }
      );
    },

    onSuccess: () => {
      setMyWorkouts([]);
      router.back();
    },
  });

  return (
    <View className="flex-1 bg-white dark:bg-black pt-[20px]">
      <ScrollView>
        <Accordion
          category={category}
          myWorkouts={myWorkouts}
          setMyWorkouts={setMyWorkouts}
        />
      </ScrollView>

      <CustomButton
        onPress={async () => {
          await mutateAsync();
        }}
        title="Добавить"
      />
    </View>
  );
};

export default Modal;
