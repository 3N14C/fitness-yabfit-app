import { colors } from "@/constants/colors";
import { FC, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Category } from "./HomeContent/Category";
import { MyWorkouts } from "./HomeContent/MyWorkouts";
import { Programs } from "./HomeContent/programs/Programs";
import Animated, { FadeInRight } from "react-native-reanimated";
import { CalculatorContent } from "./HomeContent/calculator/calculator-content";

const navbar = [
  {
    id: 1,
    title: "упражнения",
    href: "/",
  },

  {
    id: 2,
    title: "мои тренировки",
    href: "/",
  },

  {
    id: 3,
    title: "программы",
    href: "/",
  },

  {
    id: 3,
    title: "калькулятор",
    href: "/",
  },
];

export const Navbar: FC = () => {
  const [focus, setFocus] = useState<number>(0);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-screen"
      >
        <View className="flex-row" style={{ gap: 15 }}>
          {navbar.map((item, idx) => (
            <Animated.View
              key={item.id}
              entering={FadeInRight.delay(idx * 100).springify()}
              style={{
                marginEnd: idx === navbar.length - 1 ? 30 : 0,
              }}
            >
              <TouchableHighlight
                onPress={() => setFocus(idx)}
                underlayColor={"transparent"}
                style={{
                  borderRadius: Platform.OS === "ios" ? 20 : 100,
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    backgroundColor:
                      idx === focus ? colors.primaryRed : "white",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: Platform.OS === "ios" ? 20 : 100,
                    textAlign: "center",
                    borderWidth: 1,
                    borderColor: idx === focus ? "#FF5B5B" : "black",
                    color: idx === focus ? "white" : "black",
                    textTransform: "uppercase",
                  }}
                >
                  {item.title}
                </Text>
              </TouchableHighlight>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {focus === 0 && <Category />}
      {focus === 1 && <MyWorkouts />}
      {focus === 2 && <Programs />}
      {focus === 3 && <CalculatorContent />}
    </View>
  );
};
