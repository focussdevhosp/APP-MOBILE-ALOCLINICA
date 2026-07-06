import { useEffect, useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

// Variant map (must be a static require)
const VARIANTS = {
  logo: require("../../assets/pingo/logo.png"),
  waving: require("../../assets/pingo/waving.png"),
  thumbs_up: require("../../assets/pingo/thumbs_up.png"),
  clipboard: require("../../assets/pingo/clipboard.png"),
  sleeping: require("../../assets/pingo/sleeping.png"),
  sad: require("../../assets/pingo/sad.png"),
  heart: require("../../assets/pingo/heart.png"),
  celebrating: require("../../assets/pingo/celebrating.png"),
} as const;

export type PingoVariant = keyof typeof VARIANTS;

type Props = {
  variant?: PingoVariant;
  size?: number;
  /** Level of idle animation. 'none' | 'breath' | 'alive' */
  animate?: "none" | "breath" | "alive";
  style?: ViewStyle;
};

/**
 * Living Pingo: breathes, sways, blinks (via subtle scale pulse) and looks alive.
 * `animate="alive"` = full personality (breath + sway + tilt + hop)
 * `animate="breath"` = subtle breathing only
 * `animate="none"` = static
 */
export default function AnimatedPingo({
  variant = "logo",
  size = 200,
  animate = "alive",
  style,
}: Props) {
  const breath = useSharedValue(1);
  const sway = useSharedValue(0);
  const tilt = useSharedValue(0);
  const hop = useSharedValue(0);

  useEffect(() => {
    if (animate === "none") return;

    // Breathing (scale) — always on
    breath.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) })
      ),
      -1
    );

    if (animate === "alive") {
      // Gentle side-to-side sway
      sway.value = withDelay(
        200,
        withRepeat(
          withSequence(
            withTiming(-4, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
            withTiming(4, { duration: 2200, easing: Easing.inOut(Easing.sin) })
          ),
          -1
        )
      );

      // Occasional head tilt (personality kick every ~5s)
      tilt.value = withRepeat(
        withSequence(
          withDelay(3000, withTiming(-5, { duration: 400 })),
          withTiming(5, { duration: 700 }),
          withTiming(0, { duration: 400 }),
          withDelay(2500, withTiming(0, { duration: 1 })) // pause
        ),
        -1
      );

      // Tiny hop every ~4s
      hop.value = withRepeat(
        withSequence(
          withDelay(1500, withTiming(-8, { duration: 300, easing: Easing.out(Easing.quad) })),
          withTiming(0, { duration: 250, easing: Easing.bounce }),
          withDelay(3500, withTiming(0, { duration: 1 }))
        ),
        -1
      );
    }
  }, [animate]);

  const anim = useAnimatedStyle(() => ({
    transform: [
      { translateX: sway.value },
      { translateY: hop.value },
      { scale: breath.value },
      { rotate: `${tilt.value}deg` },
    ],
  }));

  const source = useMemo(() => VARIANTS[variant], [variant]);

  return (
    <View testID={`pingo-anim-${variant}`} style={[{ width: size, height: size }, style]}>
      <Animated.View style={[styles.inner, anim]}>
        <Image
          source={source}
          style={{ width: size, height: size }}
          contentFit="contain"
          transition={200}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: { flex: 1, alignItems: "center", justifyContent: "center" },
});
