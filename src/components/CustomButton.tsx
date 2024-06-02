import { colors } from "@/constants/colors";
import { FC } from "react";
import { Text } from "react-native";
import { TouchableHighlight, View } from "react-native";

export const CustomButton: FC<{ title: string; onPress: () => void }> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableHighlight
      style={{ backgroundColor: colors.primaryRed }}
      className="rounded-full mb-3"
      onPress={onPress}
    >
      <View className="items-center justify-center">
        <Text className="uppercase text-[16px] py-[20px] text-white font-extrabold">
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
