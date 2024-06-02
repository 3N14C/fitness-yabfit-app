import { IExercises } from "@/interfaces/exercises.interface";
import { FC } from "react";
import { Text, View } from "react-native";

export const Description: FC<{ exercise: IExercises[] }> = ({ exercise }) => {
  return (
    <View className="h-[300px]">
      {exercise?.map((item) => (
        <View className="my-auto">
          <View className="w-3/4 mx-auto h-1 bg-gray-300" />
          <Text
            key={item.$id}
            className="text-xl tracking-wider text-center py-5"
          >
            {item.description}
          </Text>
          <View className="w-3/4 mx-auto h-1 bg-gray-300" />
        </View>
      ))}
    </View>
  );
};
