import { FC } from "react";
import { View } from "react-native";

interface IProps {
  width?: number
}

export const Line: FC<IProps> = ({width}) => {
  return (
    <View className="my-[10px] items-center">
      <View className="bg-black/50 h-[1px]" style={{width: width ?? 350}} />
    </View>
  );
};
