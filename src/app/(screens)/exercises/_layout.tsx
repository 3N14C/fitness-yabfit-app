import { Stack, router, useGlobalSearchParams, useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity } from "react-native";

const Layout = () => {
  const { exerciseId } = useGlobalSearchParams<{ exerciseId: string }>();
  const { back } = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modal-exercise"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          headerBackButtonMenuEnabled: true,
        }}
        initialParams={{ exerciseId: exerciseId }}
      />

      <Stack.Screen
        name="[categoryId]"
        options={{
          animation: "fade_from_bottom",
        }}
      />
    </Stack>
  );
};

export default Layout;
