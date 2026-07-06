import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENTS } from "@/src/mockData";

type Tab = "historico" | "receitas" | "exames";

export default function PatientRecord() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const patient = PATIENTS.find((p) => p.id === id) || PATIENTS[0];
  const [tab, setTab] = useState<Tab>("historico");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.header}>
        <Pressable testID="back-pt" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Prontuário</Text>
        <Pressable style={styles.back}>
          <Ionicons name="call-outline" size={22} color={COLORS.brandPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Patient info */}
        <View style={styles.info}>
          <Image source={{ uri: patient.photo }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{patient.name}</Text>
            <Text style={styles.meta}>{patient.age} anos · {patient.gender}</Text>
            <Text style={styles.phone}>{patient.phone}</Text>
          </View>
          <View style={styles.condPill}>
            <Text style={styles.condText}>{patient.condition}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TabBtn label="Histórico" active={tab === "historico"} onPress={() => setTab("historico")} testID="tab-hist" />
          <TabBtn label="Receitas" active={tab === "receitas"} onPress={() => setTab("receitas")} testID="tab-rec" />
          <TabBtn label="Exames" active={tab === "exames"} onPress={() => setTab("exames")} testID="tab-exa" />
        </View>

        <View style={styles.body}>
          {tab === "historico" && patient.history.map((h, i) => (
            <View key={i} style={styles.entry}>
              <View style={styles.entryDot} />
              <View style={styles.entryBody}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{h.date}</Text>
                  <View style={styles.entryTag}>
                    <Text style={styles.entryTagText}>{h.type}</Text>
                  </View>
                </View>
                <Text style={styles.entryNote}>{h.note}</Text>
              </View>
            </View>
          ))}

          {tab === "receitas" && (
            <View style={styles.card}>
              <View style={styles.rxHeader}>
                <View style={styles.rxIcon}><Ionicons name="document-text" size={20} color="#AF52DE" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rxTitle}>Losartana 50mg</Text>
                  <Text style={styles.rxDate}>12 Mai 2026 · 1x ao dia</Text>
                </View>
              </View>
            </View>
          )}

          {tab === "exames" && (
            <View style={styles.card}>
              <View style={styles.rxHeader}>
                <View style={[styles.rxIcon, { backgroundColor: "#E1F8E7" }]}><Ionicons name="flask" size={20} color="#34C759" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rxTitle}>Hemograma Completo</Text>
                  <Text style={styles.rxDate}>Solicitado em 10 Mar 2026</Text>
                </View>
                <Pressable><Text style={styles.link}>Ver</Text></Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Actions */}
      <SafeAreaView edges={["bottom"]} style={styles.stickyWrap}>
        <View style={styles.sticky}>
          <Pressable
            testID="new-rx"
            onPress={() => router.push("/(doctor)/prescription-writer")}
            style={styles.actionBtn}
          >
            <Ionicons name="document-text" size={18} color="#fff" />
            <Text style={styles.actionText}>Nova receita</Text>
          </Pressable>
          <Pressable
            testID="start-call-pt"
            onPress={() => router.push("/(doctor)/consultation")}
            style={[styles.actionBtn, { backgroundColor: COLORS.brandSecondary }]}
          >
            <Ionicons name="videocam" size={18} color="#fff" />
            <Text style={styles.actionText}>Iniciar chamada</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function TabBtn({ label, active, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={[styles.tab, active && styles.tabActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
    backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  back: { width: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  info: {
    flexDirection: "row", alignItems: "center", gap: SPACING.md,
    backgroundColor: "#fff", padding: SPACING.lg,
  },
  avatar: { width: 64, height: 64, borderRadius: 32 },
  name: { fontWeight: "800", fontSize: FONT.lg, color: COLORS.onSurface },
  meta: { color: COLORS.muted, marginTop: 2 },
  phone: { color: COLORS.brandPrimary, marginTop: 2, fontSize: FONT.sm, fontWeight: "600" },
  condPill: { backgroundColor: "#FFE0DE", paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.pill },
  condText: { color: COLORS.error, fontWeight: "700", fontSize: 11 },
  tabs: {
    flexDirection: "row", backgroundColor: "#fff",
    paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md, gap: SPACING.md,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  tab: { paddingVertical: 8, paddingHorizontal: SPACING.md, borderRadius: RADIUS.pill, backgroundColor: COLORS.surfaceSecondary },
  tabActive: { backgroundColor: COLORS.brandPrimary },
  tabText: { fontWeight: "600", color: COLORS.onSurfaceSecondary },
  tabTextActive: { color: "#fff" },
  body: { padding: SPACING.lg },
  entry: { flexDirection: "row", gap: SPACING.md, marginBottom: SPACING.md },
  entryDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.brandPrimary, marginTop: 6 },
  entryBody: { flex: 1, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, ...SHADOW.card },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  entryDate: { fontWeight: "700", color: COLORS.onSurface },
  entryTag: { backgroundColor: COLORS.brandTertiary, paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.pill },
  entryTagText: { color: COLORS.brandPrimary, fontSize: 11, fontWeight: "700" },
  entryNote: { color: COLORS.onSurfaceSecondary, marginTop: 6, lineHeight: 20, fontSize: FONT.sm },
  card: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.card },
  rxHeader: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  rxIcon: { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: "#F4E9FA", alignItems: "center", justifyContent: "center" },
  rxTitle: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  rxDate: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  link: { color: COLORS.brandPrimary, fontWeight: "700" },
  stickyWrap: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: COLORS.border },
  sticky: { flexDirection: "row", gap: SPACING.sm, padding: SPACING.md },
  actionBtn: { flex: 1, flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.brandPrimary, paddingVertical: 14, borderRadius: RADIUS.pill },
  actionText: { color: "#fff", fontWeight: "700" },
});
