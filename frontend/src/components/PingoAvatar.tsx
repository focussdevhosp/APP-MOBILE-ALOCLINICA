import { Image } from "expo-image";
import { View, StyleSheet, ViewStyle } from "react-native";
import { PINGO_URL, COLORS, RADIUS } from "../theme";

type Props = {
  size?: number;
  ring?: boolean;
  style?: ViewStyle;
};

export default function PingoAvatar({ size = 64, ring = false, style }: Props) {
  return (
    <View
      testID="pingo-avatar"
      style={[
        {
          width: size,
          height: size,
          borderRadius: RADIUS.pill,
          backgroundColor: COLORS.brandTertiary,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        ring && styles.ring,
        style,
      ]}
    >
      <Image
        source={{ uri: PINGO_URL }}
        style={{ width: size * 0.95, height: size * 0.95 }}
        contentFit="contain"
        transition={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderWidth: 3,
    borderColor: COLORS.brandPrimary,
  },
});
