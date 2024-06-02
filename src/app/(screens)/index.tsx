import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/ui/Logo";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const Index = () => {
  const { user } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        router.replace("/(screens)/home/");
      }
      router.replace("/(screens)/auth/login");
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [user]);

  return (
    <View
      className={`flex-1 items-center bg-white justify-center transition-all`}
    >
      <Logo animated={true} />
    </View>
  );
};

export default Index;
