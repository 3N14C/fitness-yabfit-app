import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="add-workout-screen"
        // options={{ presentation: "", animation: "slide_from_bottom" }}
        options={{
          headerShown: true,
          headerBackButtonMenuEnabled: true,
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <Stack.Screen name="addExerciseModal" options={{ headerShown: false }} />

      <Stack.Screen
        name="modal-from-add-exercise"
        options={{ headerShown: true }}
      />
    </Stack>
  );
};

export default Layout;
