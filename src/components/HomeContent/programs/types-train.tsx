import { db } from "@/appwrite";
import { COLLECTION_TYPESTRAIN, DATABASE_ID } from "@/constants/appwrite";
import { ITypeTrain } from "@/interfaces/type-train-interface";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";

export const TypesTrain: FC = () => {
  const router = useRouter();
  const { data: typesTrain } = useQuery<ITypeTrain[]>({
    queryKey: ["types-train"],
    queryFn: async (): Promise<ITypeTrain[] | any> => {
      return (await db.listDocuments(DATABASE_ID, COLLECTION_TYPESTRAIN))
        .documents;
    },
  });

  return (
    <View className="gap-10">
      {typesTrain?.map((item, idx) => (
        <Pressable
          onPress={() => router.push(`/program/${item.$id}`)}
          key={item.$id}
          className={`p-5 rounded-lg border ${idx === 1 && "min-h-[128px]"}`}
        >
          <View className="gap-3">
            <Text className="text-2xl text-center font-extrabold">
              {item.name}
            </Text>

            <Text className="text-center">{item.description}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};
