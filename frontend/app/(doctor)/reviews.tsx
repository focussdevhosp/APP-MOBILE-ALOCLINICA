import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENTS } from "@/src/mockData";

const REVIEWS = [
  { id: "r1", patient: PATIENTS[0], stars: 5, date: "12 Mai", text: "Dra. Ana é excelente! Muito atenciosa e me explicou tudo com clareza.", tags: ["Atenciosa", "Explicativa"] },
  { id: "r2", patient: PATIENTS[1], stars: 5, date: "10 Mai", text: "Consulta ótima, minha filha ficou super à vontade.", tags: ["Empática"] },
  { id: "r3", patient: PATIENTS[2], stars: 4, date: "05 Mai", text: "Bom atendimento, pontual e profissional.", tags: ["Pontual", "Profissional"] },
  { id: "r4", patient: PATIENTS[3], stars: 5, date: "01 Mai", text: "Superou minhas expectativas!", tags: ["Excelente"] },
];

const AVG = 4.9;
const TOTAL = 328;
const DISTRIBUTION = [
  { s: 5, pct: 82 },
  { s: 4, pct: 12 },
  { s: 3, pct: 4 },
  { s: 2, pct: 1 },
  { s: 1, pct: 1 },
];

export default function Reviews() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-rev" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Avaliações</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp} style={styles.summary}>
          <View style={styles.avgBox}>
            <Text style={styles.avg}>{AVG.toFixed(1)}</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Ionicons key={n} name="star" size={16} color="#FFCC00" />
              ))}
            </View>
            <Text style={styles.totalText}>{TOTAL} avaliações</Text>
          </View>
          <View style={styles.dist}>
            {DISTRIBUTION.map((d) => (
              <View key={d.s} style={styles.distRow}>
                <Text style={styles.distStar}>{d.s}★</Text>
                <View style={styles.distBar}>
                  <View style={[styles.distFill, { width: `${d.pct}%` }]} />
                </View>
                <Text style={styles.distPct}>{d.pct}%</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Text style={styles.sectionTitle}>Comentários recentes</Text>
        {REVIEWS.map((r, i) => (
          <Animated.View
            key={r.id}
            entering={FadeInUp.delay(i * 80).springify()}
            style={styles.review}
          >
            <View style={styles.rHead}>
              <Image source={{ uri: r.patient.photo }} style={styles.rPhoto} />
              <View style={{ flex: 1 }}>
                <Text style={styles.rName}>{r.patient.name}</Text>
                <View style={styles.rMeta}>
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Ionicons key={j} name="star" size={12} color="#FFCC00" />
                  ))}
                  <Text style={styles.rDate}>· {r.date}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.rText}>{r.text}</Text>
            <View style={styles.rTags}>
              {r.tags.map((t) => (
                <View key={t} style={styles.rTag}>
                  <Text style={styles.rTagText}>{t}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: COLORS.border },
  back: { width: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  summary: { flexDirection: "row", gap: SPACING.lg, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, ...SHADOW.card },
  avgBox: { alignItems: "center", justifyContent: "center", paddingHorizontal: SPACING.md },
  avg: { fontSize: 40, fontWeight: "800", color: COLORS.onSurface },
  starsRow: { flexDirection: "row", gap: 2, marginTop: 4 },
  totalText: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 4 },
  dist: { flex: 1, gap: 6, justifyContent: "center" },
  distRow: { flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  distStar: { fontSize: FONT.sm, fontWeight: "600", color: COLORS.onSurfaceSecondary, width: 24 },
  distBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: COLORS.border, overflow: "hidden" },
  distFill: { height: "100%", backgroundColor: "#FFCC00" },
  distPct: { fontSize: FONT.sm, color: COLORS.muted, width: 32, textAlign: "right" },
  sectionTitle: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.lg, marginBottom: SPACING.md },
  review: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.card },
  rHead: { flexDirection: "row", alignItems: "center", gap: SPACING.md, marginBottom: SPACING.sm },
  rPhoto: { width: 40, height: 40, borderRadius: 20 },
  rName: { fontWeight: "700", color: COLORS.onSurface },
  rMeta: { flexDirection: "row", alignItems: "center", gap: 2, marginTop: 2 },
  rDate: { color: COLORS.muted, fontSize: 11, marginLeft: 4 },
  rText: { color: COLORS.onSurfaceSecondary, lineHeight: 20 },
  rTags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: SPACING.sm },
  rTag: { backgroundColor: COLORS.brandTertiary, paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.pill },
  rTagText: { color: COLORS.brandPrimary, fontSize: 11, fontWeight: "700" },
});
