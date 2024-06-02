import { IExercises } from "@/interfaces/exercises.interface";
import { FC } from "react";
import { Image, Text, View } from "react-native";

export const Muscles: FC<{ exercise: IExercises[] }> = ({ exercise }) => {
  return (
    <View className="mt-5">
      {exercise?.map((item) => (
        <View key={item.$id} className="gap-10">
          {item.muscles.map((muscle) => (
            <View key={muscle.$id} className="flex-row gap-10 items-center">
              <Image
                source={{ uri: muscle.img }}
                width={150}
                height={150}
                className="border border-gray-300"
              />
              <Text className="text-[22px] max-w-[150px]">{muscle.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
