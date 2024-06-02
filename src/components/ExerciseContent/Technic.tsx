import { IExercises } from "@/interfaces/exercises.interface";
import { FC } from "react";
import { Text, View } from "react-native";

export const Technic: FC<{ exercise: IExercises[] }> = ({ exercise }) => {
  return (
    <View className="">
      {exercise?.map((item, idx) => (
        <View key={item.$id} className="">
          {item.technics.split("\n\n").map((paragraph, idx) => {
            return (
              <View>
                <View
                  key={idx}
                  className="flex-row"
                  style={{ alignItems: idx === 0 ? "center" : "center" }}
                >
                  <Text
                    className="text-[130px] mr-10 font-bold text-gray-300"
                    style={{
                      width: 85,
                      textAlign: "center",
                    }}
                  >
                    {`${idx + 1}`}
                  </Text>
                  <Text
                    className=""
                    style={{
                      maxWidth: idx === 0 ? 240 : idx === 4 ? 260 : 220,
                      // marginLeft: idx === 0 ? 15 : idx === 6 ? 15 : 0,
                    }}
                  >
                    {paragraph.replace(/\d+\.\s/g, "")}
                  </Text>
                </View>

                {idx !== item.technics.split("\n\n").length - 1 && (
                  <View className="w-full h-1 bg-gray-300" />
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};
