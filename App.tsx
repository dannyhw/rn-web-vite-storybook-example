import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AnimatedLogo } from "./components/animated";
import { ExpoImageExample } from "./components/expo-image";
import { Ball } from "./components/gesture";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [count, setCount] = useState(0);
  const scale = useSharedValue(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#242424" }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingVertical: 40,
            paddingHorizontal: 16,
          }}
        >
          <AnimatedLogo />

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              marginVertical: 32,
            }}
          >
            Vite + React Native
          </Text>

          <Pressable
            onPress={() => {
              setCount((count) => count + 1);
              scale.value = withSequence(
                withTiming(1.2, { duration: 200 }),
                withTiming(1, { duration: 200 })
              );
            }}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: "grey",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                },
                { transform: [{ scale: scale }] },
              ]}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                count is {count}
              </Text>
            </Animated.View>
          </Pressable>

          <View
            style={{
              gap: 32,
              flexDirection: "column",
              marginTop: 32,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Examples
            </Text>

            <ExpoImageExample />

            <Text style={{ fontSize: 12, color: "white" }}>
              Gesture Handler
            </Text>
            <Ball />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
