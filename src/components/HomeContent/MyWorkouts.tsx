import { db } from "@/appwrite";
import { COLLECTION_MYWORKOUTS, DATABASE_ID } from "@/constants/appwrite";
import { IMyWorkouts } from "@/interfaces/myWorkouts.interface";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FC } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CategoryCard } from "../CategoryCard";
import { CustomButton } from "../CustomButton";
import { useAuth } from "../../context/AuthContext";
import { Query } from "appwrite";

export const MyWorkouts: FC = () => {
  const { user } = useAuth();

  const { data: myWorkouts, isLoading } = useQuery<IMyWorkouts[]>({
    queryKey: ["myWorkouts"],
    queryFn: async (): Promise<IMyWorkouts[] | any> => {
      try {
        return (
          await db.listDocuments(DATABASE_ID, COLLECTION_MYWORKOUTS, [
            Query.equal("userId", user.id),
          ])
        ).documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (myWorkouts?.length > 0) {
    return (
      <View className="mt-[40px] flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="">
          <CategoryCard myWorkouts={myWorkouts} />
        </ScrollView>

        <Pressable
          onPress={() => {
            router.push("/home/add-workout-screen");
          }}
        >
          <View
            className="mt-[40px]  bg-[#e2e2e2]  h-[200px]"
            style={{
              borderRadius: Platform.OS === "ios" ? 20 : 20,
            }}
          >
            <View
              className="my-auto flex-row items-center justify-center"
              style={{
                borderRadius: Platform.OS === "ios" ? 20 : 100,
              }}
            >
              <Text
                className="bg-white px-[25px] py-[15px] text-[25px] font-light"
                style={{
                  borderRadius: Platform.OS === "ios" ? 20 : 100,
                }}
              >
                +
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => {
        router.push("/home/add-workout-screen");
      }}
    >
      <View className="mt-[40px]  bg-[#e2e2e2] rounded-[10px] h-[200px]">
        <View className="my-auto flex-row items-center justify-center">
          <Text
            className="bg-white px-[25px] py-[15px] text-[25px] font-light"
            style={{
              borderRadius: Platform.OS === "ios" ? 20 : 100,
            }}
          >
            +
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
