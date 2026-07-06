import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { EXAMS } from "@/src/mockData";

export default function Exams() {
  const router = useRouter();

  const meta = {
    pendente: { color: COLORS.warning, bg: "#FFF7D6", label: "Pendente", icon: "time" as const },
    coletado: { color: COLORS.info, bg: "#D6F0FF", label: "Coletado", icon: "flask" as const },
    disponivel: { color: COLORS.success, bg: "#E1F8E7", label: "Disponível", icon: "checkmark-circle" as const },
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-exams" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Exames</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {EXAMS.map((e) => {
          const m = meta[e.status];
          return (
            <Pressable key={e.id} style={styles.card} testID={`exam-${e.id}`}>
              <View style={[styles.examIcon, { backgroundColor: m.bg }]}>
                <Ionicons name={m.icon} size={22} color={m.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{e.name}</Text>
                <Text style={styles.doc}>Solicitado por {e.requestedBy}</Text>
                <View style={styles.metaRow}>
                  <Ionicons name="calendar-outline" size={13} color={COLORS.muted} />
                  <Text style={styles.date}>{e.date}</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end", gap: SPACING.sm }}>
                <View style={[styles.pill, { backgroundColor: m.bg }]}>
                  <Text style={[styles.pillText, { color: m.color }]}>{m.label}</Text>
                </View>
                {e.status === "disponivel" && (
                  <Pressable style={styles.viewBtn} testID={`view-${e.id}`}>
                    <Ionicons name="download-outline" size={16} color={COLORS.brandPrimary} />
                    <Text style={styles.viewText}>Ver</Text>
                  </Pressable>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  back: { width: 40 },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  examIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  name: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  doc: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  date: { color: COLORS.onSurfaceSecondary, fontSize: FONT.sm, fontWeight: "500" },
  pill: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.pill },
  pillText: { fontWeight: "700", fontSize: 11 },
  viewBtn: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.brandTertiary,
  },
  viewText: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
});
