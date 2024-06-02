import { db } from "@/appwrite";
import { Accordion } from "@/components/Accordion";
import { COLLECTION_CATEGORY, DATABASE_ID } from "@/constants/appwrite";
import { ICategory } from "@/interfaces/category.interface";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

const Index = () => {
  const { categoryId } = useLocalSearchParams();

  const { data: exercisesByCategoryId, isLoading } = useQuery<ICategory[]>({
    queryKey: ["exercisesByCategoryId"],
    queryFn: async (): Promise<ICategory[] | any> => {
      return (
        await db.listDocuments(DATABASE_ID, COLLECTION_CATEGORY, [
          Query.equal("$id", categoryId),
        ])
      ).documents;
    },
  });

  return (
    <ScrollView className="flex-1 bg-white">
      {exercisesByCategoryId?.map((category) => (
        <View key={category.$id}>
          <Text className="text-center mt-[40px] font-extrabold text-[32px] uppercase">
            {category.name}
          </Text>

          <View className="mt-[50px]">
            <Accordion
              setMyWorkouts={() => {}}
              subcategory={category.subcategory}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Index;
