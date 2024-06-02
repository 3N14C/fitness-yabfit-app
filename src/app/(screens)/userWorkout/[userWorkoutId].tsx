import { db } from "@/appwrite";
import { COLLECTION_MYWORKOUTS, DATABASE_ID } from "@/constants/appwrite";
import { colors } from "@/constants/colors";
import { IMyWorkouts } from "@/interfaces/myWorkouts.interface";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

const Index = () => {
  const { userWorkoutId } = useLocalSearchParams<{ userWorkoutId: string }>();

  const { data: userWorkout } = useQuery<IMyWorkouts[]>({
    queryKey: ["userWorkout"],
    queryFn: async (): Promise<IMyWorkouts[] | any> => {
      try {
        return (
          await db.listDocuments(DATABASE_ID, COLLECTION_MYWORKOUTS, [
            Query.equal("$id", userWorkoutId),
          ])
        ).documents;
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(userWorkout);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center mt-[40px] ">
        {userWorkout?.map((userWorkout) => (
          <View key={userWorkout.$id}>
            <View className="flex-row items-center justify-between px-[40px]">
              <Text className="text-[32px] text-center font-extrabold uppercase">
                {userWorkout.name}
              </Text>

              <Pressable
                onPress={() => {
                  router.push("/home/addExerciseModal");
                  router.setParams({
                    userWorkoutId: userWorkout.$id,
                  });
                }}
              >
                <Text
                  className="text-2xl border text-[#a1a1a1] text-center px-[13px] py-[5px] rounded-full"
                  style={{
                    borderColor: "#f2f2f2",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>

            <View className="w-screen px-[20px] mt-[20px] flex-col mb-[10px] gap-10">
              {userWorkout?.exercises?.map((exercise) => (
                <Pressable
                  key={exercise.$id}
                  onPress={() => {
                    router.push("/exercises/modal");
                    router.setParams({
                      exerciseId: exercise.$id,
                    });
                  }}
                >
                  <ImageBackground
                    source={{ uri: exercise.img[0] }}
                    className="w-full justify-end"
                    imageStyle={{ borderRadius: 20 }}
                    style={{ height: 225 }}
                  >
                    <Text className="text-white mb-[10px] max-w-[130px] ml-[20px] font-extrabold text-[16px]">
                      {exercise.name}
                    </Text>
                  </ImageBackground>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;
