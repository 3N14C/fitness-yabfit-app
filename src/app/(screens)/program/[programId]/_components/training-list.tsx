import { db } from "@/appwrite";
import { COLLECTION_TYPESTRAIN, DATABASE_ID } from "@/constants/appwrite";
import { ITypeTrain } from "@/interfaces/type-train-interface";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "expo-router";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";

interface IProps {
  programId: string;
}

export const TrainingList: FC<IProps> = ({ programId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: training } = useQuery<ITypeTrain>({
    queryKey: ["type-one-train"],
    queryFn: async (): Promise<ITypeTrain | any> => {
      return await db.getDocument(
        DATABASE_ID,
        COLLECTION_TYPESTRAIN,
        programId
      );
    },
  });

  return (
    <View className="gap-10">
      {training?.baseWorkout.map((workout, idx) => (
        <Pressable
          onPress={() => router.push(`${pathname}/${workout.$id}`)}
          key={workout.$id}
          className={`p-5 rounded-lg border ${idx === 1 && "min-h-[128px]"}`}
        >
          <View className="gap-3">
            <Text className="text-2xl text-center font-extrabold">
              {workout.name}
            </Text>

            <Text className="text-center">{workout.description}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
