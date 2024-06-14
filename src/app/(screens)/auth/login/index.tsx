import { Logo } from "@/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { z } from "zod";

const Index = () => {
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/(screens)/home/");
    }
  }, [user]);

  const schema = z.object({
    email: z.string().email({
      message: "Пожалуйста, введите действительный адрес электронной почты",
    }),
    password: z
      .string({ required_error: "Это поле обязательно" })
      .min(9, "Пароль должен быть не менее 9 символов"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      await login({
        email: getValues().email,
        password: getValues().password,
      });
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="">
        <Animated.View
          entering={FadeInUp.delay(100).springify()}
          className="py-[20px]"
        >
          <View style={styles.container}>
            <Logo />
          </View>
        </Animated.View>
        <View className="justify-center items-center mt-40">
          <View className="max-w-[350px] w-screen flex-col gap-[30px]">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Animated.View
                  entering={FadeInUp.delay(300).springify()}
                  className="w-full"
                >
                  <Text className=" text-[#bdbdbd] mb-2">Электронный адрес</Text>
                  <TextInput
                    className={`  text-base py-[10px] px-3 border border-black/30 rounded-full ${
                      errors.email?.message && "border-[#ff7878]"
                    }`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={errors.email?.message ? "" : "example@mail.ru"}
                    placeholderTextColor={"#bdbdbd"}
                  />

                  <>
                    {errors.email?.message && (
                      <Text className="text-red-500">
                        *{errors.email?.message}
                      </Text>
                    )}
                  </>
                </Animated.View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Animated.View
                  entering={FadeInUp.delay(500).springify()}
                  className="w-full"
                >
                  <Text className=" text-[#bdbdbd] mb-2">Пароль</Text>
                  <TextInput
                    className={`text-black  text-base py-[10px] px-3 border border-black/30  rounded-full ${
                      errors.password?.message && "border-[#ff7878]"
                    }`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={"#bdbdbd"}
                    placeholder="●●●●●●●●●●"
                  />

                  <>
                    {errors.password?.message && (
                      <Text className="text-red-500">
                        *{errors.password?.message}
                      </Text>
                    )}
                  </>
                </Animated.View>
              )}
            />
          </View>
        </View>

        <View className="justify-center items-center mt-60">
          <View className="flex-col gap-[20px] justify-end">
            <Animated.View entering={FadeInUp.delay(700).springify()}>
              <TouchableHighlight
                underlayColor={"#ff7878"}
                onPress={handleSubmit(async () => await mutateAsync())}
                className="bg-[#ff7878] w-creen w-[350px] rounded-full"
              >
                <Text className="uppercase text-center text-[21px] py-[15px] text-white font-bold">
                  вход
                </Text>
              </TouchableHighlight>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(900).springify()}>
              <TouchableHighlight className="">
                <Link
                  href={"/(screens)/auth/register/"}
                  className="uppercase text-center text-[21px] py-[15px]  font-bold"
                >
                  регистрация
                </Link>
              </TouchableHighlight>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});
