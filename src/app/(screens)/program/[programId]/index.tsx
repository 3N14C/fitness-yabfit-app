import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";
import { TrainingList } from "./_components/training-list";

const Index = () => {
  const { programId } = useLocalSearchParams();

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="mt-10" style={{ paddingLeft: 20, paddingRight: 20 }}>
        <TrainingList programId={programId as string} />
      </View>
    </SafeAreaView>
  );
};

export default Index;
