import { FC, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Description } from "./ExerciseContent/Description";
import { colors } from "@/constants/colors";
import { IExercises } from "@/interfaces/exercises.interface";
import { Technic } from "./ExerciseContent/Technic";
import { Muscles } from "./ExerciseContent/Muscles";
import { Errors } from "./ExerciseContent/Errors";

const navbar = [
  {
    id: 1,
    title: "описание",
  },

  {
    id: 2,
    title: "техника",
  },

  {
    id: 3,
    title: "мышцы",
  },

  {
    id: 4,
    title: "ошибки",
  },
];

export const ExerciseNavbar: FC<{ exercise: IExercises[] }> = ({
  exercise,
}) => {
  const [focus, setFocus] = useState<number>(1);

  return (
    <View className="">
      <ScrollView
        horizontal
        centerContent
        showsHorizontalScrollIndicator={false}
        // contentOffset={{ x: 100, y: 0 }}
      >
        <View className="flex-row items-center gap-3 justify-between px-[20px]">
          {navbar.map((navItem, idx) => (
            <Pressable
              onPress={() => setFocus(navItem.id)}
              key={navItem.id}
              style={{
                borderRadius: Platform.OS === "ios" ? 20 : 100,
                overflow: "hidden",
              }}
            >
              <Text
                style={{
                  backgroundColor:
                    navItem.id === focus ? colors.primaryRed : "white",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: Platform.OS === "ios" ? 20 : 100,
                  textAlign: "center",
                  // marginEnd: idx === navbar.length - 1 ? 30 : 0,
                  borderWidth: 1,
                  borderColor: navItem.id === focus ? "#FF5B5B" : "black",
                  color: navItem.id === focus ? "white" : "black",
                  textTransform: "uppercase",
                }}
              >
                {navItem.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="px-[20px] mt-[20px]">
        {focus === 1 && <Description exercise={exercise} />}
        {focus === 2 && <Technic exercise={exercise} />}
        {focus === 3 && <Muscles exercise={exercise} />}
        {focus === 4 && <Errors exercise={exercise} />}
      </View>
    </View>
  );
};
