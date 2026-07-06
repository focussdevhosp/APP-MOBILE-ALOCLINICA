import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PingoAvatar from "@/src/components/PingoAvatar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

export default function RoleSelect() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.brandPrimary }}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[COLORS.brandPrimary, "#0056B3", "#003D80"]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <PingoAvatar variant="logo" size={160} />
            <Text testID="app-title" style={styles.title}>Alô Clínica</Text>
            <Text style={styles.subtitle}>
              Sua saúde na palma da mão, com o carinho do Pingo 🐧
            </Text>
          </View>

          <View style={styles.cards}>
            <Pressable
              testID="role-patient"
      onPress={() => router.push("/login?role=patient")}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={[styles.iconBubble, { backgroundColor: COLORS.brandTertiary }]}>
                <Ionicons name="person" size={32} color={COLORS.brandPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Sou Paciente</Text>
                <Text style={styles.cardDesc}>Agende consultas, consulte receitas e converse com o Pingo</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
            </Pressable>

            <Pressable
              testID="role-doctor"
              onPress={() => router.push("/login?role=doctor")}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={[styles.iconBubble, { backgroundColor: "#FFE9D1" }]}>
                <Ionicons name="medkit" size={32} color={COLORS.brandSecondary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Sou Médico(a)</Text>
                <Text style={styles.cardDesc}>Gerencie sua agenda, prontuários e ganhos</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Primeira vez por aqui?</Text>
            <Pressable testID="cta-register" onPress={() => router.push("/register?role=patient")}>
              <Text style={styles.footerLink}>Criar conta</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: SPACING.xl, justifyContent: "space-between" },
  header: { alignItems: "center", marginTop: SPACING.xl },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginTop: SPACING.lg,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FONT.lg,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginTop: SPACING.sm,
    lineHeight: 22,
    maxWidth: 320,
  },
  cards: { gap: SPACING.md, marginVertical: SPACING.xl },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOW.strong,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  iconBubble: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  cardDesc: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  footer: { alignItems: "center", marginTop: SPACING.lg },
  footerText: { color: "rgba(255,255,255,0.8)", fontSize: FONT.base },
  footerLink: {
    color: "#fff",
    fontSize: FONT.lg,
    fontWeight: "700",
    marginTop: SPACING.xs,
    textDecorationLine: "underline",
  },
});
