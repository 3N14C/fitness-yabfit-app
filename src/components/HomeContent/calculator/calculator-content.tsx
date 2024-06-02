import { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { GenderPicker } from "./gender-picker";
import { LevelActive } from "./level-active";
import { useFormulaResult } from "@/functions/formula-function";
import { ModalCalculator } from "@/components/ModalCalculator";
import { Line } from "@/ui/Line";

export const CalculatorContent: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [ka, setKa] = useState<number>(0);
  const [kb, setKb] = useState<number>(0);
  const [v, setV] = useState("");
  const [genderPick, SetGenderPick] = useState<string>("");
  const [variantPick, setVariantPick] = useState<string>("");
  const u = +v * ka;
  const b = +v * kb;
  const j = 1.4 * +v;

  const { resultB, resultJ, resultK, resultU } = useFormulaResult({
    kb: kb,
    b: b,
    j: j,
    ka: ka,
    v: +v,
    u: u,
    k: u * 4 + b * 4 + j * 9,
  });

  const handleOpenModal = () => {
    if (v.length === 0) return;
    setOpen(true);
  };

  return (
    <View style={{ marginVertical: 40 }}>
      <ModalCalculator
        open={open}
        onClose={() => setOpen(false)}
        resultB={resultB}
        resultJ={resultJ}
        resultK={resultK}
        resultU={resultU}
      />
      <GenderPicker genderPick={genderPick} setGenderPick={SetGenderPick} />

      <View className="gap-5 mt-5">
        <Text className="text-2xl font-extrabold text-center">Ваш вес</Text>
        <TextInput
          keyboardType="numeric"
          className={`  text-base py-[15px] px-3 border border-black/30 rounded-md`}
          onChangeText={setV}
          value={v}
          placeholder={"Введите ваш вес"}
          placeholderTextColor={"#bdbdbd"}
        />

        <View className="my-5">
          <Line />
        </View>
      </View>

      <LevelActive
        ka={ka}
        setKa={setKa}
        kb={kb}
        setKb={setKb}
        gender={genderPick}
        variantPick={variantPick}
        setVariantPick={setVariantPick}
      />

      <View className="justify-center items-center mt-10">
        <Pressable
          onPress={handleOpenModal}
          className="bg-[#ff7878] rounded-full w-full py-5"
        >
          <Text className="text-center text-xl text-white">Расчитать</Text>
        </Pressable>
      </View>
    </View>
  );
};
