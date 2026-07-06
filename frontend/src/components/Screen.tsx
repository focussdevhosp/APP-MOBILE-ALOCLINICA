import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../theme";

type Props = {
  children: ReactNode;
  bg?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
  statusStyle?: "light" | "dark" | "auto";
  padded?: boolean;
};

export default function Screen({
  children,
  bg = COLORS.surface,
  edges = ["top"],
  statusStyle = "dark",
  padded = false,
}: Props) {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor: bg }]}
    >
      <StatusBar style={statusStyle} />
      <View style={[styles.inner, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { flex: 1 },
  padded: { paddingHorizontal: 16 },
});
