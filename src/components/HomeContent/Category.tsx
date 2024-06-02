import { db } from "@/appwrite";
import { COLLECTION_CATEGORY, DATABASE_ID } from "@/constants/appwrite";
import { ICategory } from "@/interfaces/category.interface";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { View } from "react-native";
import { CategoryCard } from "../CategoryCard";

export const Category: FC = () => {
  const { data: category, isLoading } = useQuery<ICategory[]>({
    queryKey: ["category"],
    queryFn: async (): Promise<ICategory[] | any> => {
      return (await db.listDocuments(DATABASE_ID, COLLECTION_CATEGORY))
        .documents;
    },
  });

  return (
    <View className="" style={{ marginTop: 40 }}>
      <CategoryCard category={category} />
    </View>
  );
};
