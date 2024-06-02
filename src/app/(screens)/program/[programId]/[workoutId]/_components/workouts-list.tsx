import { db } from "@/appwrite";
import { COLLECTION_BASEWORKOUTS, DATABASE_ID } from "@/constants/appwrite";
import { colors } from "@/constants/colors";
import { IBaseWorkout } from "@/interfaces/base-wrokout-interface";
import { useWorkoutStatus } from "@/storage/workout-status-storage";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface IProps {
  workoutId: string;
}

export const WorkoutsList: FC<IProps> = ({ workoutId }) => {
  const expiresIn = 60 * 60 * 24 * 1; //
  const { workoutIds, addWorkout, clearWorkouts } = useWorkoutStatus();

  const { data: workout } = useQuery<IBaseWorkout>({
    queryKey: ["workouts-list"],
    queryFn: async (): Promise<IBaseWorkout | any> => {
      return await db.getDocument(
        DATABASE_ID,
        COLLECTION_BASEWORKOUTS,
        workoutId
      );
    },
  });

  useEffect(() => {}, [workoutIds]);

  return (
    <View className="">
      <Pressable onPress={clearWorkouts} className="mb-5">
        <Text style={{ color: colors.primaryRed }}>Очистить выполненное</Text>
      </Pressable>
      {workout?.baseWorkoutEx.map((workoutEx) => (
        <Pressable
          key={workoutEx.$id}
          onPress={() => {}}
          className="flex-row items-center gap-3 border p-5 rounded-lg relative"
        >
          <Image
            source={{ uri: workoutEx.image }}
            width={200}
            height={150}
            className="rounded-lg"
          />

          <View className="gap-10">
            <Text>Подходы: {workoutEx.podhodi}</Text>
            <Text className="">Повторения: {workoutEx.povtoreniya}</Text>
            <Text>Время отдыха: {workoutEx.otdih}</Text>
          </View>

          <BouncyCheckbox
            className="absolute right-0"
            style={{ top: 15 }}
            fillColor={colors.primaryRed}
            isChecked={workoutIds?.includes(workoutEx.$id)}
            onPress={() => addWorkout(workoutEx.$id)}
          />
        </Pressable>
      ))}
    </View>
  );
};
