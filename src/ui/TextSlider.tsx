import { colors } from "@/constants/colors";
import { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Animated as AnimatedNative,
  View,
  Easing,
} from "react-native";
import Animated, { FadeInLeft, FadeOut } from "react-native-reanimated";

const textSlider = [
  {
    id: 1,
    title: "используй готовые программы",
  },

  {
    id: 2,
    title: "или составь собственную тренировку",
  },
];

export const TextSlider: FC = () => {
  const [index, setIndex] = useState(0);
  const pulseAnim = useRef(new AnimatedNative.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textSlider.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulse = () => {
      AnimatedNative.sequence([
        AnimatedNative.timing(pulseAnim, {
          toValue: 1.3,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        AnimatedNative.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(pulse);
    };
    pulse();
  }, []);

  return (
    <View className="flex-row items-center">
      <FlatList
        data={[textSlider[index]]}
        renderItem={({ item }) => (
          <Animated.View
            exiting={FadeOut.springify().duration(100)}
            entering={FadeInLeft.springify()}
          >
            <Text
              className={`text-[36px] h-[180px] ${
                index === 0 ? "max-w-[300px]" : "max-w-[320px]"
              } font-extrabold uppercase`}
            >
              {item.title}
            </Text>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={300}
        snapToAlignment={"start"}
      />

      <TouchableOpacity
        onPress={() => {
          index === 0 ? setIndex(1) : setIndex(0);
        }}
      >
        <AnimatedNative.View style={{ transform: [{ scale: pulseAnim }] }}>
          <Text
            style={{
              color: colors.primaryRed,
              fontWeight: "400",
              fontSize: 20,
              marginTop: -30,
            }}
          >
            &gt;
          </Text>
        </AnimatedNative.View>
      </TouchableOpacity>
    </View>
  );
};
