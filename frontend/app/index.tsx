import { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import PingoAvatar from "@/src/components/PingoAvatar";
import { COLORS, SPACING, FONT } from "@/src/theme";

const { width } = Dimensions.get("window");

export default function Splash() {
  const router = useRouter();
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);
  const bounce = useSharedValue(0);
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 700, easing: Easing.out(Easing.back(1.4)) });
    opacity.value = withTiming(1, { duration: 500 });
    bounce.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
    const pulse = (v: Animated.SharedValue<number>, delay: number) => {
      v.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0.3, { duration: 400 })
          ),
          -1
        )
      );
    };
    pulse(dot1, 0);
    pulse(dot2, 200);
    pulse(dot3, 400);

    const t = setTimeout(() => router.replace("/onboarding"), 2500);
    return () => clearTimeout(t);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: bounce.value }],
  }));

  const dotStyle = (v: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({ opacity: v.value }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[COLORS.brandPrimary, "#0056B3", "#003D80"]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.center, logoStyle]}>
        <PingoAvatar variant="waving" size={200} />
        <Text style={styles.title}>Alô Clínica</Text>
        <Text style={styles.tagline}>Sua saúde na palma da mão</Text>
      </Animated.View>
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, dotStyle(dot1)]} />
        <Animated.View style={[styles.dot, dotStyle(dot2)]} />
        <Animated.View style={[styles.dot, dotStyle(dot3)]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  center: { alignItems: "center" },
  title: { color: "#fff", fontSize: 42, fontWeight: "800", marginTop: SPACING.lg, letterSpacing: -0.5 },
  tagline: { color: "rgba(255,255,255,0.85)", fontSize: FONT.lg, marginTop: SPACING.xs },
  dotsRow: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    gap: 10,
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" },
});
