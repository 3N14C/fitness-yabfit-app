import { Line } from "@/ui/Line";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";

const genders = [
  {
    id: "male",
    name: "Мужской",
  },

  {
    id: "female",
    name: "Женский",
  },
];

interface IProps {
  genderPick: string;
  setGenderPick: React.Dispatch<React.SetStateAction<string>>;
}

export const GenderPicker: FC<IProps> = ({ genderPick, setGenderPick }) => {
  return (
    <View>
      <Text className="text-2xl font-extrabold text-center">
        Выберите ваш пол
      </Text>
      <View className="flex-row justify-evenly">
        {genders.map((gender) => (
          <Pressable
            onPress={() => setGenderPick(gender.id)}
            key={gender.id}
            className={`mt-5 flex-row items-center border border-gray-300 p-2 rounded-md ${
              gender.id === genderPick ? "bg-red-300 border-red-300" : ""
            }`}
          >
            <Text
              className={`text-xl ${
                gender.id === genderPick ? "text-white" : ""
              }`}
            >
              {gender.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="my-5">
        <Line />
      </View>
    </View>
  );
};
