import { FC } from "react";
import { Pressable, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface IProps {
  gender: string;
  variantPick: string;
  setVariantPick: React.Dispatch<React.SetStateAction<string>>;
  kb: number;
  setKb: React.Dispatch<React.SetStateAction<number>>;
  ka: number;
  setKa: React.Dispatch<React.SetStateAction<number>>;
}

export const LevelActive: FC<IProps> = ({
  gender,
  variantPick,
  setVariantPick,
  kb,
  setKb,
  ka,
  setKa,
}) => {
  const variants = [
    {
      id: "low",
      name: "Низкая физическая активность",
      description: "(сидячий образ жизни, минимум активности)",
      kb: gender === "male" ? 1.2 : 1,
      ka: 3,
    },
    {
      id: "medium",
      name: "Небольшая физическая активность",
      description: "(легкие упражнения 1-3 раза в неделю)",
      kb: gender === "male" ? 1.45 : 1.2,
      ka: 3.5,
    },
    {
      id: "high",
      name: "Умеренная физическая активность",
      description: "(силовые тренировки 2-3 раза в неделю)",
      kb: gender === "male" ? 1.6 : 1.4,
      ka: 4.2,
    },
    {
      id: "veryHigh",
      name: "Высокая физическая активность",
      description: "(ежедневные тяжелые тренировки)",
      kb: gender === "male" ? 1.8 : 1.5,
      ka: 5,
    },
  ];

  const handleOnPress = (id: string, kb: number, ka: number) => {
    setVariantPick(id);
    setKb(kb);
    setKa(ka);
  };

  return (
    <View className="my-5">
      <View>
        <Text className="text-2xl font-extrabold text-center">
          Ваша активность
        </Text>
        <Text className="text-center">
          Пожалуйста, выберите вариант активности, наиболее подходящий для вас
        </Text>
      </View>

      <View className="gap-5 mt-5">
        {variants.map((variant) => (
          <Pressable
            onPress={() => handleOnPress(variant.id, variant.kb, variant.ka)}
            key={variant.id}
            className={`flex-row `}
            style={{ width: "100%" }}
          >
            <View
              className={`border border-gray-400 p-5 rounded-md w-full flex-row justify-between ${
                variant.id === variantPick ? "bg-red-300 border-red-300" : ""
              }`}
            >
              <View className="w-[80%] gap-2">
                <Text
                  className={`text-xl ${
                    variant.id === variantPick ? "text-white" : ""
                  }`}
                >
                  {variant.name}
                </Text>
                <Text
                  className={`text-md ${
                    variant.id === variantPick ? "text-white" : ""
                  }`}
                >
                  {variant.description}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
