import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const VACCINES = [
  { name: "Tríplice Viral (SCR)", date: "12/05/2020", doses: "2/2", complete: true },
  { name: "Hepatite B", date: "05/03/2019", doses: "3/3", complete: true },
  { name: "Febre Amarela", date: "18/09/2021", doses: "1/1", complete: true },
  { name: "COVID-19", date: "22/11/2023", doses: "4/4", complete: true },
  { name: "Influenza", date: "Vencida 03/2024", doses: "1/1", complete: false, warning: true },
  { name: "HPV", date: "Pendente", doses: "0/2", complete: false },
];

export default function Vaccines() {
  const router = useRouter();
  const completed = VACCINES.filter((v) => v.complete).length;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-vac" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Vacinas</Text>
        <Pressable style={styles.back}>
          <Ionicons name="add-circle" size={26} color={COLORS.brandPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp} style={styles.summary}>
          <AnimatedPingo variant="thumbs_up" size={80} animate="alive" />
          <View style={{ flex: 1 }}>
            <Text style={styles.sumTitle}>Cartão de Vacinação</Text>
            <Text style={styles.sumDesc}>{completed} de {VACCINES.length} em dia</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(completed / VACCINES.length) * 100}%` }]} />
            </View>
          </View>
        </Animated.View>

        <Text style={styles.section}>Minhas vacinas</Text>
        {VACCINES.map((v, i) => (
          <Animated.View key={i} entering={FadeInUp.delay(i * 60).springify()}>
            <View style={styles.card}>
              <View
                style={[
                  styles.vIcon,
                  {
                    backgroundColor: v.complete
                      ? "#E1F8E7"
                      : v.warning
                      ? "#FFE0DE"
                      : "#FFF7D6",
                  },
                ]}
              >
                <Ionicons
                  name={v.complete ? "checkmark-circle" : v.warning ? "warning" : "time"}
                  size={22}
                  color={v.complete ? COLORS.success : v.warning ? COLORS.error : COLORS.warning}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.vName}>{v.name}</Text>
                <Text style={styles.vDate}>{v.date}</Text>
              </View>
              <View style={styles.dosesPill}>
                <Text style={styles.dosesText}>{v.doses}</Text>
              </View>
            </View>
          </Animated.View>
        ))}

        <View style={styles.tip}>
          <Ionicons name="information-circle" size={20} color={COLORS.brandPrimary} />
          <Text style={styles.tipText}>
            Adicione suas vacinas escaneando o QR code do cartão físico
          </Text>
        </View>
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
  back: { minWidth: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.brandTertiary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sumTitle: { fontWeight: "700", color: COLORS.brandDark, fontSize: FONT.base },
  sumDesc: { color: COLORS.onBrandTertiary, marginTop: 2, fontSize: FONT.sm },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 4,
    marginTop: SPACING.sm,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: COLORS.brandPrimary },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginBottom: SPACING.md },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  vIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  vName: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  vDate: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  dosesPill: {
    backgroundColor: COLORS.brandTertiary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  dosesText: { color: COLORS.brandPrimary, fontWeight: "700", fontSize: FONT.sm },
  tip: {
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "flex-start",
    backgroundColor: COLORS.brandTertiary,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.md,
  },
  tipText: { flex: 1, color: COLORS.onBrandTertiary, fontSize: FONT.sm, lineHeight: 20 },
});
