import { Stack, usePathname, useRouter } from "expo-router";
import "../global.css";
import { Pressable, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        headerShown:
          !pathname.includes("/home") &&
          !pathname.includes("/auth") &&
          !pathname.includes("/calculator") &&
          !pathname.includes('/'),
        statusBarStyle: "dark",
        headerShadowVisible: false,
        header: () => (
          <Pressable
            onPress={() => router.back()}
            className="mt-10"
            style={{ padding: 10 }}
          >
            <ArrowLeft color={colors.primaryRed} />
          </Pressable>
        ),
      }}
    />
  );
}
