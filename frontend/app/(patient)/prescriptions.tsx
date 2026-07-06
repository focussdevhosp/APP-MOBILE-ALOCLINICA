import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PRESCRIPTIONS } from "@/src/mockData";

export default function Prescriptions() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-rx" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Receitas</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {PRESCRIPTIONS.map((p) => (
          <View key={p.id} style={styles.card} testID={`rx-${p.id}`}>
            <View style={styles.cardHeader}>
              <View style={styles.rxIcon}>
                <Ionicons name="document-text" size={22} color="#AF52DE" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.doc}>{p.doctor}</Text>
                <Text style={styles.date}>{p.date}</Text>
              </View>
              <Pressable style={styles.dlBtn} testID={`dl-${p.id}`}>
                <Ionicons name="download-outline" size={20} color={COLORS.brandPrimary} />
              </Pressable>
            </View>

            <View style={styles.divider} />

            {p.medications.map((m, i) => (
              <View key={i} style={styles.med}>
                <View style={styles.medDot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.medName}>
                    {m.name} <Text style={styles.medDose}>{m.dose}</Text>
                  </Text>
                  <Text style={styles.medMeta}>{m.frequency}</Text>
                  <Text style={styles.medDuration}>{m.duration}</Text>
                </View>
              </View>
            ))}

            <View style={styles.footer}>
              <Pressable style={styles.footBtn}>
                <Ionicons name="share-outline" size={16} color={COLORS.brandPrimary} />
                <Text style={styles.footText}>Compartilhar</Text>
              </Pressable>
              <Pressable style={styles.footBtn}>
                <Ionicons name="cart-outline" size={16} color={COLORS.brandPrimary} />
                <Text style={styles.footText}>Comprar</Text>
              </Pressable>
            </View>
          </View>
        ))}
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
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  rxIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: "#F4E9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  doc: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  date: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  dlBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: SPACING.md },
  med: { flexDirection: "row", gap: SPACING.md, marginBottom: SPACING.md, alignItems: "flex-start" },
  medDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#AF52DE", marginTop: 8 },
  medName: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  medDose: { color: COLORS.brandPrimary, fontWeight: "600" },
  medMeta: { color: COLORS.onSurfaceSecondary, marginTop: 2, fontSize: FONT.sm },
  medDuration: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  footer: { flexDirection: "row", gap: SPACING.md, marginTop: SPACING.xs },
  footBtn: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.brandTertiary,
  },
  footText: { color: COLORS.brandPrimary, fontWeight: "600" },
});
