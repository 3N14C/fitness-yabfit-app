import { db } from "@/appwrite";
import { COLLECTION_BASEWORKOUTS, DATABASE_ID } from "@/constants/appwrite";
import { colors } from "@/constants/colors";
import { IBaseWorkout } from "@/interfaces/base-wrokout-interface";
import { useWorkoutStatus } from "@/storage/workout-status-storage";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Checkbox } from "react-native-paper";

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

  useEffect(() => {

  }, [workoutIds]);


  return (
    <ScrollView className="" showsVerticalScrollIndicator={false}>
      {/* <Pressable onPress={clearWorkouts} className="mb-5">
        <Text style={{ color: colors.primaryRed }}>Очистить выполненное</Text>
      </Pressable> */}
      <View className="gap-3">
        {workout?.baseWorkoutEx.map((workoutEx) => (
          <Pressable
            key={workoutEx.$id}
            onPress={() => {}}
            className="flex-row items-center gap-1 border p-5 rounded-lg relative"
          >
            <View className="gap-2">
              <Text className="max-w-[200px] text-lg font-semibold">
                {workoutEx.name}
              </Text>
              <View className="flex-row items-center gap-5">
                <Image
                  source={{ uri: workoutEx.image }}
                  width={200}
                  height={150}
                  className="rounded-lg"
                />

                <View className="gap-5 items-center">
                  <View className="items-center">
                    <Text>Подходы:</Text>
                    <Text className="font-bold">{workoutEx.podhodi}</Text>
                  </View>

                  <View className="items-center">
                    <Text className="">Повторения:</Text>
                    <Text className="font-bold">{workoutEx.povtoreniya}</Text>
                  </View>

                  <View className="items-center">
                    <Text>Время отдыха:</Text>
                    <Text className="font-bold">{workoutEx.otdih}</Text>
                  </View>
                </View>
              </View>
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
    </ScrollView>
  );
};
