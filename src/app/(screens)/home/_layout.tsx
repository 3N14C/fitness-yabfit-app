import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="add-workout-screen"
        // options={{ presentation: "", animation: "slide_from_bottom" }}
      />

      <Stack.Screen
        name="addExerciseModal"
        options={{ presentation: "modal", animation: "slide_from_bottom" }}
      />
    </Stack>
  );
};

export default Layout;
