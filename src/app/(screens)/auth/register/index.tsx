import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/ui/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView, StatusBar, StyleSheet, Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { z } from "zod";

const Index = () => {
  const { signup, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  const schema = z.object({
    name: z
      .string({ required_error: "Это поле обязательно" })
      .min(3, "Это поле должно быть не менее 3 символов"),
    email: z.string().email({
      message: "Пожалуйста, введите действительный адрес электронной почты",
    }),
    password: z
      .string({ required_error: "Это поле обязательно" })
      .min(9, "Пароль должен быть не менее 9 символов"),
    isChecked: z
      .boolean({ required_error: "Это поле обязательно" })
      .refine((val) => val, { message: "Это поле обязательно" }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isChecked: false,
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["register"],
    mutationFn: async () => {
      await signup({
        username: getValues().name,
        email: getValues().email,
        password: getValues().password,
      });
    },
  });

  return (
    <SafeAreaView className=" flex-1 bg-white">
      <Animated.View
        entering={FadeInUp.delay(100).springify()}
        className="py-[20px]"
      >
        <View style={styles.container}>
          <Logo />
        </View>
      </Animated.View>
      <View className="flex-1 justify-center items-center">
        <View className="max-w-[350px] w-screen flex-col gap-[30px]">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Animated.View
                entering={FadeInUp.delay(300).springify()}
                className="w-full"
              >
                <Text className=" mb-2 text-[#bdbdbd]">имя пользователя</Text>
                <TextInput
                  className={`text-black  text-base py-[10px] px-3 border border-black/30  rounded-full ${
                    errors?.name?.message ? "border-[#ff7878]" : ""
                  }`}
                  placeholder="John Doe"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor={"#bdbdbd"}
                />

                <>
                  {errors?.name?.message && (
                    <Text className="text-red-500">
                      *{errors?.name?.message}
                    </Text>
                  )}
                </>
              </Animated.View>
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Animated.View
                entering={FadeInUp.delay(500).springify()}
                className="w-full"
              >
                <Text className=" text-[#bdbdbd] mb-2">электронный адрес</Text>
                <TextInput
                  className={`text-black  text-base py-[10px] px-3 border border-black/30  rounded-full ${
                    errors.email?.message && "border-[#ff7878]"
                  }`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={"example@mail.ru"}
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
                entering={FadeInUp.delay(700).springify()}
                className="w-full"
              >
                <Text className=" text-[#bdbdbd] mb-2">пароль</Text>
                <TextInput
                  className={`text-black  text-base py-[10px] px-3 border border-black/30  rounded-full ${
                    errors.password?.message && "border-[#ff7878]"
                  }`}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="●●●●●●●●●●"
                  placeholderTextColor={"#bdbdbd"}
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

          <Controller
            control={control}
            name="isChecked"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <View className="flex-row items-center">
                  <Animated.View entering={FadeInLeft.delay(900).springify()}>
                    <BouncyCheckbox
                      size={20}
                      fillColor="#ff7878"
                      isChecked={value}
                      onPress={onChange}
                    />
                  </Animated.View>

                  <Animated.Text
                    entering={FadeInRight.delay(900).springify()}
                    className=" max-w-[223px]"
                  >
                    Я согласен с{" "}
                    <Text className="text-[#ff7878]">политикой сервиса</Text> и
                    даю разрешение на{" "}
                    <Text className="text-[#ff7878]">
                      обработку персональных данных
                    </Text>
                  </Animated.Text>
                </View>

                {errors.isChecked?.message && (
                  <Text className="text-red-500 absolute -bottom-5">
                    *{errors.isChecked?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
      </View>

      <View className="justify-center items-center pb-[20px]">
        <View className="flex-col gap-[20px]">
          <TouchableHighlight
            onPress={handleSubmit(async () => await mutateAsync())}
            className="bg-[#ff7878] w-creen w-[350px] rounded-full"
          >
            <Text className="uppercase text-center text-[21px] py-[15px] text-white font-bold">
              регистрация
            </Text>
          </TouchableHighlight>

          <TouchableHighlight className="">
            <Link
              href={"/(screens)/auth/login/"}
              className="uppercase text-center text-[21px] py-[15px]  font-bold"
            >
              вход
            </Link>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
});
