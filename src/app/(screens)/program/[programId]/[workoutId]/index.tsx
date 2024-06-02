import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { WorkoutsList } from "./_components/workouts-list";

const Index = () => {
  const { programId, workoutId } = useLocalSearchParams();

  return (
    <View
      className="bg-white flex-1 pt-10"
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <WorkoutsList workoutId={workoutId as string} />
    </View>
  );
};

export default Index;
