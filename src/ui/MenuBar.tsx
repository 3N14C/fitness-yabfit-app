import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { FC } from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

export const MenuBar: FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <Pressable onPress={handleLogout} className="">
      {/* <Animated.View
        entering={FadeInRight.delay(200).springify()}
        className="w-[76px] h-[0.6px] bg-black mr-[20px]"
      />
      <Animated.View
        entering={FadeInRight.delay(500).springify()}
        className="w-[76px] h-[0.5px] bg-black mt-[15px] ml-[20px]"
      /> */}
      <LogOut className="text-red-500" />
    </Pressable>
  );
};
