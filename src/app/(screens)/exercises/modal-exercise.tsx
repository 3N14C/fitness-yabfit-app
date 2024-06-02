import { db } from "@/appwrite";
import { ExerciseNavbar } from "@/components/ExerciseNavbar";
import { COLLECTION_EXERCISES, DATABASE_ID } from "@/constants/appwrite";
import { IExercises } from "@/interfaces/exercises.interface";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";

const Modal = () => {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();

  const { data: exercises, isLoading } = useQuery<IExercises[]>({
    queryKey: ["exercise"],
    queryFn: async (): Promise<IExercises[] | any> => {
      return (
        await db.listDocuments(DATABASE_ID, COLLECTION_EXERCISES, [
          Query.equal("$id", exerciseId),
        ])
      ).documents;
    },
  });

  return (
    <ScrollView className="flex-1 bg-white">
      {exercises?.map((exercise) => (
        <View key={exercise.$id}>
          <Image
            className="w-[400px] h-[300px]"
            resizeMode="contain"
            source={{ uri: exercise.img[1] }}
          />

          <View className="mt-[20px]">
            <ExerciseNavbar exercise={exercises} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Modal;
