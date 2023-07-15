import { Pressable as RNPressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Pressable = Animated.createAnimatedComponent(RNPressable);

interface ButtonProps {
  onPress: () => void;
  text: string;
}

export const Button = ({ onPress, text }: ButtonProps) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    [opacity]
  );

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 32,
          paddingVertical: 8,
          backgroundColor: "purple",
        },
        animatedStyle,
      ]}
      onPressIn={() => {
        opacity.value = withTiming(0.5);
      }}
      onPressOut={() => {
        opacity.value = withTiming(1);
      }}
    >
      <Text style={{ color: "white" }}>{text}</Text>
    </Pressable>
  );
};
