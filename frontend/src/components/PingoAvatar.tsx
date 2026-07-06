import { Image, ImageSource } from "expo-image";
import { View, StyleSheet, ViewStyle } from "react-native";
import { COLORS, RADIUS } from "../theme";

// Static require map — required for Metro to bundle assets
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
  bg?: string;
  round?: boolean;
  style?: ViewStyle;
};

export default function PingoAvatar({
  variant = "logo",
  size = 64,
  bg = "transparent",
  round = false,
  style,
}: Props) {
  const source: ImageSource = VARIANTS[variant];
  return (
    <View
      testID={`pingo-${variant}`}
      style={[
        {
          width: size,
          height: size,
          borderRadius: round ? RADIUS.pill : 0,
          backgroundColor: bg,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Image
        source={source}
        style={{ width: size, height: size }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}
