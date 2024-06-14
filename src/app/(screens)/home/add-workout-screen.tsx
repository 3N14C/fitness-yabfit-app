import { ID, db } from "@/appwrite";
import { Accordion } from "@/components/Accordion";
import { CustomButton } from "@/components/CustomButton";
import {
  COLLECTION_CATEGORY,
  COLLECTION_MYWORKOUTS,
  DATABASE_ID,
} from "@/constants/appwrite";
import { useAuth } from "@/context/AuthContext";
import { ICategory } from "@/interfaces/category.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const Modal = () => {
  const { user } = useAuth();
  const {setOptions} = useNavigation()
  const {push} = useRouter()

  const [categoryName, setCategoryName] = useState<string>("");
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [image, setImage] = useState(null);

  const { data: category, isLoading } = useQuery<ICategory[]>({
    queryKey: ["category"],
    queryFn: async (): Promise<ICategory[] | any> => {
      return (await db.listDocuments(DATABASE_ID, COLLECTION_CATEGORY))
        .documents;
    },
  });

  const getImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(image.assets[0].uri);
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["addToMyWorkouts"],
    mutationFn: async () => {
      const myWorkoutsIds = myWorkouts.map((myWorkout) => myWorkout.$id);
      return await db.createDocument(
        DATABASE_ID,
        COLLECTION_MYWORKOUTS,
        ID.unique(),
        {
          userId: user.id,
          name: categoryName,
          img: image,
          exercises: myWorkoutsIds,
        }
      );
    },

    onSuccess: () => {
      setMyWorkouts([]);
      setCategoryName("");
      setImage(null);
    },
  });

  useEffect(() => {
    setOptions({
      header: () => {
        return (
          <Pressable
            onPress={() => push("/home")}
            className="bg-white p-5"
          >
            <ArrowLeft className="text-black p-2" />
          </Pressable>
        );
      },
    });
  }, []);

  return (
    <View className="flex-1 px-[20px] bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-[50px]"
      >
        <View className="items-center">
          <View className="items-center">
            <Text className="uppercase text-[16px]">название тренировки</Text>
            <TextInput
              className="w-[350px] p-[10px] border border-gray-300 rounded-full mt-[10px] mb-[20px]"
              placeholder="Пример: Грудь"
              value={categoryName}
              onChangeText={(text) => setCategoryName(text)}
            />
          </View>

          <View className="items-center mt-[40px]">
            <Text className="uppercase text-[16px]">изображение</Text>
            {!image ? (
              <Pressable
                onPress={() => getImage()}
                className="mt-[20px] w-[350px] bg-[#e2e2e2] rounded-[20px] h-[200px]"
              >
                <View className="my-auto flex-row items-center justify-center">
                  <Text className="px-[25px] py-[15px] text-[#848484] text-[16px] font-light">
                    Добавьте изображение
                  </Text>
                </View>
              </Pressable>
            ) : (
              <Pressable onPress={() => getImage()} className="mt-[20px]">
                <Image
                  className="w-[350px] h-[200px] rounded-[20px]"
                  source={{ uri: image }}
                />
              </Pressable>
            )}
          </View>

          <View className="items-center mt-[70px]">
            <Text className="uppercase text-[16px]">выберите упражнения</Text>
            <View className="mt-[20px]">
              <Accordion
                category={category}
                myWorkouts={myWorkouts}
                setMyWorkouts={setMyWorkouts}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomButton
        title="добавить"
        onPress={async () => {
          await mutateAsync();
          router.back();
        }}
      />
    </View>
  );
};

export default Modal;
