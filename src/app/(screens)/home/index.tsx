import { Navbar } from "@/components/HomeNavbar";
import { Logo } from "@/ui/Logo";
import { MenuBar } from "@/ui/MenuBar";
import { TextSlider } from "@/ui/TextSlider";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Animated, { FadeInLeft, } from "react-native-reanimated";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="">
        <View style={styles.container}>
          <View className="flex-row items-center justify-between">
            <Animated.View entering={FadeInLeft.delay(200).springify()}>
              <Logo />
            </Animated.View>
            <MenuBar />
          </View>

          <View>
            <View className="mt-[20px]">
              <TextSlider />
            </View>

            <View style={{ marginTop: 0 }}>
              <Navbar />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
    paddingHorizontal: 20,
  },
});
