import { ICategory } from "@/interfaces/category.interface";
import { IMyWorkouts } from "@/interfaces/myWorkouts.interface";
import { router } from "expo-router";
import { Dumbbell } from "lucide-react-native";
import { FC, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Animated, { FadeInDown } from "react-native-reanimated";

export const CategoryCard: FC<{
  category?: ICategory[];
  myWorkouts?: IMyWorkouts[];
}> = ({ category, myWorkouts }) => {
  if (myWorkouts) {
    return (
      <View className="flex-col gap-10">
        {myWorkouts?.map((myWorkouts, idx) => (
          <Menu key={myWorkouts.$id}>
            <MenuTrigger
              triggerOnLongPress
              onAlternativeAction={() => {
                router.push(`/userWorkout/${myWorkouts.$id}`);
                router.setParams({ userWorkoutId: myWorkouts.$id });
              }}
              children={
                <>
                  <ImageBackground
                    source={{ uri: myWorkouts.img }}
                    imageStyle={{ borderRadius: 20 }}
                    className="w-full"
                    style={{ height: 225 }}
                  >
                    <View
                      style={{ paddingHorizontal: 20, paddingVertical: 20 }}
                    >
                      <Text className="text-white font-extrabold uppercase text-[32px]">
                        {myWorkouts.name}
                      </Text>

                      <View className="flex-row items-center gap-1">
                        <Dumbbell size={20} color="#fff" />
                        <Text className="text-white">
                          {myWorkouts?.exercises?.length}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </>
              }
            />
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  width: 350,
                  paddingHorizontal: 20,
                  marginTop: 220,
                  borderRadius: 20,
                  // alignItems: 'center'
                },

                optionsWrapper: {
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 20,
                },
              }}
            >
              <MenuOption onSelect={() => alert(`Edit`)}>
                <Text>Редактировать</Text>
              </MenuOption>
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{ color: "red" }}>Удалить</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        ))}
      </View>
    );
  }

  if (category) {
    return (
      <View className="flex-col gap-10">
        {category?.map((category, idx) => (
          <Animated.View
            key={category.$id}
            entering={FadeInDown.delay(idx * 100)}
          >
            <TouchableOpacity
              onPress={() =>
                router.push(`/(screens)/exercises/${category.$id}`)
              }
            >
              <ImageBackground
                source={{ uri: category.image }}
                imageStyle={{ borderRadius: 20 }}
                className="w-full"
                style={{ height: 225 }}
              >
                <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                  <Text className="text-white font-extrabold uppercase text-[32px]">
                    {category.name}
                  </Text>

                  <View className="flex-row items-center gap-1">
                    <Dumbbell size={20} color="#fff" />
                    <Text className="text-white">
                      {category?.subcategory?.reduce(
                        (total, item) => total + (item?.exercises?.length || 0),
                        0
                      )}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  }
};
