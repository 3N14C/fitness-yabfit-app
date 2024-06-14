import { db } from "@/appwrite";
import { DATABASE_ID, COLLECTION_MYWORKOUTS } from "@/constants/appwrite";
import { colors } from "@/constants/colors";
import { ICategory } from "@/interfaces/category.interface";
import { IExercises } from "@/interfaces/exercises.interface";
import { IMyWorkouts } from "@/interfaces/myWorkouts.interface";
import { ISubcategory } from "@/interfaces/subcategory.interface";
import { Line } from "@/ui/Line";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import { router, useGlobalSearchParams } from "expo-router";
import { User2 } from "lucide-react-native";
import { FC, useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { List, useTheme } from "react-native-paper";

export const Accordion: FC<{
  subcategory?: ISubcategory[];
  category?: ICategory[];
  myWorkouts?: IExercises[];
  setMyWorkouts?: React.Dispatch<React.SetStateAction<IExercises[]>>;
}> = ({ subcategory, category, myWorkouts, setMyWorkouts }) => {
  // const [myWorkouts, setMyWorkouts] = useState([]);

  const { userWorkoutId } = useGlobalSearchParams<{ userWorkoutId: string }>();

  const { data: editMyWorkout } = useQuery<IMyWorkouts[]>({
    queryKey: ["editUserWorkout"],
    queryFn: async (): Promise<IMyWorkouts[] | any> => {
      return (
        await db.listDocuments(DATABASE_ID, COLLECTION_MYWORKOUTS, [
          Query.equal("$id", userWorkoutId),
        ])
      ).documents;
    },
  });

  useEffect(() => {
    setMyWorkouts(editMyWorkout?.flatMap((item) => item.exercises) || []);
  }, [editMyWorkout]);

  const myWorkoutIds = editMyWorkout?.flatMap(
    (item) => item.exercises?.map((item) => item.$id) || []
  );

  if (subcategory) {
    return (
      <View className="flex-col gap-2">
        {subcategory?.map((subcategory, idx) => (
          <List.AccordionGroup key={subcategory.$id}>
            <List.Accordion
              id={subcategory.$id}
              title={
                <>
                  <Text className="font-bold text-[16px] uppercase">
                    {subcategory.name}
                  </Text>
                </>
              }
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 20,
              }}
              background={{ color: "#fff" }}
              titleStyle={{ fontSize: 16, color: "#000" }}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: 100, y: 0 }}
              >
                <View className="flex-row items-center w-full">
                  {subcategory.exercises?.map((exercise) => (
                    <List.Item
                      key={exercise.$id}
                      title={
                        <Pressable
                          onPress={() => {
                            router.push(`/(screens)/exercises/modal-exercise`);
                            router.setParams({ exerciseId: exercise.$id });
                          }}
                        >
                          <ImageBackground
                            source={{ uri: exercise.img[0] }}
                            className="h-[170px] w-[300px] justify-end"
                            imageStyle={{ borderRadius: 15 }}
                          >
                            <Text className="text-white mb-[10px] max-w-[130px] ml-[20px] font-extrabold text-[16px]">
                              {exercise.name}
                            </Text>
                          </ImageBackground>
                        </Pressable>
                      }
                    />
                  ))}
                </View>
              </ScrollView>
            </List.Accordion>

            <Line />
          </List.AccordionGroup>
        ))}
      </View>
    );
  }

  const addToMyWorkouts = (id: string, workouts: IExercises) => {
    const existMyWorkouts = myWorkouts?.find(
      (myWorkout) => myWorkout.$id === id
    );

    if (existMyWorkouts) {
      setMyWorkouts(myWorkouts.filter((myWorkout) => myWorkout.$id !== id));
    } else {
      setMyWorkouts([...myWorkouts, workouts]);
    }
  };

  if (category) {
    return (
      <View className="flex-col gap-2 pb-[30px]">
        {category?.map((category, idx) => (
          <List.AccordionGroup key={category.$id}>
            <List.Accordion
              id={category.$id}
              title={
                <>
                  <Text className="font-bold text-[16px] uppercase">
                    {category.name}
                  </Text>
                </>
              }
              style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
              background={{ color: "#fff" }}
              titleStyle={{ fontSize: 16, color: "#000" }}
            >
              <View className="flex-col w-full">
                {category.subcategory?.map((subcategory) => (
                  <List.AccordionGroup key={subcategory.$id}>
                    <List.Accordion
                      style={{ backgroundColor: "#fff", paddingHorizontal: 40 }}
                      background={{ color: "#fff" }}
                      titleStyle={{ fontSize: 16, color: "#000" }}
                      id={subcategory.$id}
                      key={subcategory.$id}
                      title={
                        <>
                          <Text className="text-black mb-[10px] max-w-[130px] ml-[20px] font-bold uppercase text-[14px]">
                            {subcategory.name}
                          </Text>
                        </>
                      }
                    >
                      <List.Item
                        style={{ paddingHorizontal: 60 }}
                        title={
                          <View className="flex-col w-full gap-5">
                            {subcategory.exercises?.map((exercise) => (
                              <View
                                key={exercise.$id}
                                className="flex-row items-center"
                              >
                                <BouncyCheckbox
                                  innerIconStyle={{
                                    borderRadius: 5,
                                  }}
                                  className="w-[15px]"
                                  size={20}
                                  fillColor={colors.primaryRed}
                                  iconStyle={{
                                    borderRadius: 5,
                                  }}
                                  onPress={() =>
                                    addToMyWorkouts(exercise.$id, exercise)
                                  }
                                  isChecked={myWorkoutIds?.includes(
                                    exercise.$id
                                  )}
                                />
                                <Pressable
                                  onPress={() => {
                                    router.push("/home/modal-from-add-exercise");
                                    router.setParams({
                                      exerciseId: exercise.$id,
                                    });
                                  }}
                                >
                                  <Text className="text-black max-w-[200px] ml-[20px] font-light underline text-[14px]">
                                    {exercise.name}
                                  </Text>
                                </Pressable>
                              </View>
                            ))}
                          </View>
                        }
                      />
                    </List.Accordion>
                  </List.AccordionGroup>
                ))}
              </View>
            </List.Accordion>

            <Line />
          </List.AccordionGroup>
        ))}
      </View>
    );
  }
};
