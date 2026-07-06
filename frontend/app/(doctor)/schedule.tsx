import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { TODAY_AGENDA } from "@/src/mockData";

const DAYS = [
  { key: "seg", label: "Seg", num: "13" },
  { key: "ter", label: "Ter", num: "14" },
  { key: "qua", label: "Qua", num: "15", today: true },
  { key: "qui", label: "Qui", num: "16" },
  { key: "sex", label: "Sex", num: "17" },
  { key: "sab", label: "Sáb", num: "18" },
];

export default function DoctorSchedule() {
  const [day, setDay] = useState("qua");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Agenda</Text>
        <Pressable style={styles.newBtn} testID="add-slot">
          <Ionicons name="add" size={22} color="#fff" />
        </Pressable>
      </View>

      {/* Week */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekRow}
      >
        {DAYS.map((d) => (
          <Pressable
            key={d.key}
            testID={`d-${d.key}`}
            onPress={() => setDay(d.key)}
            style={[styles.dayCard, day === d.key && styles.dayCardActive]}
          >
            <Text style={[styles.dayLabel, day === d.key && { color: "#fff" }]}>{d.label}</Text>
            <Text style={[styles.dayNum, day === d.key && { color: "#fff" }]}>{d.num}</Text>
            {d.today && <View style={[styles.todayDot, day === d.key && { backgroundColor: "#fff" }]} />}
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.dateText}>Quarta, 15 de Maio</Text>
        {TODAY_AGENDA.map((a) => {
          const statusMeta = {
            aguardando: { color: COLORS.warning, bg: "#FFF7D6", label: "Agendada" },
            em_andamento: { color: COLORS.success, bg: "#E1F8E7", label: "Em andamento" },
            concluida: { color: COLORS.muted, bg: "#F0F0F5", label: "Concluída" },
          }[a.status];

          return (
            <View key={a.id} style={styles.item}>
              <View style={styles.timeCol}>
                <Text style={styles.time}>{a.time}</Text>
                <View style={styles.timeLine} />
              </View>
              <Pressable
                onPress={() => router.push(`/(doctor)/patient/${a.patientId}`)}
                style={styles.card}
                testID={`sch-${a.id}`}
              >
                <Image source={{ uri: a.photo }} style={styles.photo} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.ptName}>{a.patient}</Text>
                  <Text style={styles.reason}>{a.reason}</Text>
                  <View style={[styles.pill, { backgroundColor: statusMeta.bg, alignSelf: "flex-start", marginTop: 6 }]}>
                    <Text style={[styles.pillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface },
  newBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.brandPrimary, alignItems: "center", justifyContent: "center", ...SHADOW.card },
  weekRow: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, height: 100, alignItems: "center" },
  dayCard: {
    width: 60, height: 80, borderRadius: RADIUS.md, backgroundColor: "#fff",
    alignItems: "center", justifyContent: "center", ...SHADOW.card, flexShrink: 0,
  },
  dayCardActive: { backgroundColor: COLORS.brandPrimary },
  dayLabel: { fontSize: FONT.sm, color: COLORS.muted, fontWeight: "600" },
  dayNum: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface, marginTop: 4 },
  todayDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLORS.brandPrimary, marginTop: 4 },
  list: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  dateText: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface, marginBottom: SPACING.md },
  item: { flexDirection: "row", gap: SPACING.md },
  timeCol: { alignItems: "center", width: 50 },
  time: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.sm },
  timeLine: { flex: 1, width: 2, backgroundColor: COLORS.border, marginTop: 4 },
  card: { flex: 1, flexDirection: "row", alignItems: "center", gap: SPACING.md, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.card },
  photo: { width: 44, height: 44, borderRadius: 22 },
  ptName: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  reason: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  pill: { paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.pill },
  pillText: { fontWeight: "700", fontSize: 11 },
});
