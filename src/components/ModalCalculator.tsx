import { Line } from "@/ui/Line";
import { FC } from "react";
import { Pressable, ScrollView, Text } from "react-native";
import { View } from "react-native";
import Modal, { ModalContent } from "react-native-modals";

interface IProps {
  open: boolean;
  onClose: () => void;
  resultB: number;
  resultJ: number;
  resultK: number;
  resultU: number;
}

export const ModalCalculator: FC<IProps> = ({
  open,
  onClose,
  resultB,
  resultJ,
  resultK,
  resultU,
}) => {
  return (
    <Modal visible={open} onTouchOutside={onClose}>
      <ModalContent>
        <View className="gap-5">
          <Text className="text-2xl font-bold text-center">
            Ваш расчет БЖУ и калорий в день
          </Text>

          <View className="gap-3">
            <Line width={330} />

            <View className="justify-between flex-row items-center">
              <View className="gap-5">
                <Text className="text-xl">
                  Белки: <Text>{Math.round(resultB)} г</Text>
                </Text>
                <Text className="text-xl">Жиры: {Math.round(resultJ)} г</Text>
                <Text className="text-xl">
                  Углеводы: {Math.round(resultU)} г
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-xl">Дневная калорийность: </Text>
                <Text className="text-xl">{Math.round(resultK)} Ккл</Text>
              </View>
            </View>

            <Line width={330} />
          </View>

          <View className="gap-5">
            <Text>
              Данная формула не является идеально подходящей для какого-либо
              человека, но позволяет задать точку опоры, от которой можно
              двигаться. То есть вы можете воспользоваться данным расчетом
              калорий и следить за своими показателями (вес, процент жира,
              состояние).
            </Text>

            <Text>
              В случае набора излишней жировой массы, следует снизить количество
              углеводов на 20г, а количество белков увеличить на 5г. И пробовать
              менять эти значения пока не получите нужный вам результат.
            </Text>

            <Text>
              В случае потери массы тела, следует уменьшить количество белков на
              10г, а количество углеводов увеличить на 20г. И так же пробовать
              менять эти значения пока не получите нужный вам результат.
            </Text>

            <Text>
              Качество пищи тоже влияет на внешний вид и здоровье. Поэтому
              старайтесь составлять рацион из продуктов, которые вам не
              навредят.
            </Text>
          </View>

          <Pressable
            onPress={onClose}
            className="border-red-300 bg-red-300 rounded-md py-5"
          >
            <Text className="text-xl text-center text-white">Закрыть</Text>
          </Pressable>
        </View>
      </ModalContent>
    </Modal>
  );
};
