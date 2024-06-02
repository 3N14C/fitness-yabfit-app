import { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

export const Logo: FC<{ animated?: boolean }> = ({ animated }) => {
  if (animated) {
    return (
      <View className={`items-center`}>
        <View>
          <Animated.Text
            entering={FadeInLeft.delay(100).springify()}
            className="uppercase text-[48px] font-[900]"
          >
            yab
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.delay(300).springify()}
            className="uppercase text-[36px] text-[#FF5B5B] font-[900] absolute top-[26.5px] right-[-5px]"
          >
            fit
          </Animated.Text>
        </View>
      </View>
    );
  }

  return (
    <View className="items-center">
      <View className="">
        <Text className="uppercase  text-[48px] font-extrabold">yab</Text>
        <Text className="uppercase text-[36px] text-[#FF5B5B] font-extrabold absolute top-[26.5px] right-[-4px]">
          fit
        </Text>
      </View>
    </View>
  );
};
