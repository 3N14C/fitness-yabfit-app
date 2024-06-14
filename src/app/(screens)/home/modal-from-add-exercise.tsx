import { db } from "@/appwrite";
import { ExerciseNavbar } from "@/components/ExerciseNavbar";
import { DATABASE_ID, COLLECTION_EXERCISES } from "@/constants/appwrite";
import { IExercises } from "@/interfaces/exercises.interface";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import {
  useLocalSearchParams,
  useNavigation,
  useRouter,
  usePathname,
} from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const Index = () => {
  const { exerciseId } = useLocalSearchParams<{ exerciseId: string }>();
  const { setOptions } = useNavigation();
  const { push, back } = useRouter();
  const pathname = usePathname();

  console.log(pathname);

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

  useEffect(() => {
    setOptions({
      header: () => {
        return (
          <Pressable
            onPress={() => {
              // if (pathname.includes("/exercises")) return back();
              // return push("/home/add-workout-screen");
              return back();
            }}
            className="bg-white p-5"
          >
            <ArrowLeft className="text-black p-2" />
          </Pressable>
        );
      },
    });
  }, []);

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

export default Index;
