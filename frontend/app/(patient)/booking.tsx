import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTORS, TIME_SLOTS } from "@/src/mockData";

const DAYS = [
  { day: "Seg", num: "13", available: true },
  { day: "Ter", num: "14", available: true },
  { day: "Qua", num: "15", available: true },
  { day: "Qui", num: "16", available: true },
  { day: "Sex", num: "17", available: false },
  { day: "Sáb", num: "18", available: true },
  { day: "Dom", num: "19", available: false },
];

export default function Booking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];
  const [dayIdx, setDayIdx] = useState(2);
  const [time, setTime] = useState<string | null>(null);
  const [type, setType] = useState<"video" | "presencial">("video");
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <View style={styles.successWrap}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={56} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Consulta agendada!</Text>
          <Text style={styles.successDesc}>
            {doctor.name}{"\n"}
            {DAYS[dayIdx].day}, {DAYS[dayIdx].num} de Maio às {time}
          </Text>
          <View style={styles.summaryBox}>
            <Image source={{ uri: doctor.photo }} style={styles.sumPhoto} />
            <View style={{ flex: 1 }}>
              <Text style={styles.sumName}>{doctor.name}</Text>
              <Text style={styles.sumSpec}>{doctor.specialty}</Text>
            </View>
            <Text style={styles.sumPrice}>R$ {type === "video" ? doctor.price : doctor.price + 60}</Text>
          </View>
          <Pressable
            testID="go-home"
            onPress={() => router.replace("/(patient)/home")}
            style={styles.successBtn}
          >
            <Text style={styles.successBtnText}>Voltar para o início</Text>
          </Pressable>
          <Pressable testID="see-appts" onPress={() => router.replace("/(patient)/appointments")}>
            <Text style={styles.linkTop}>Ver minhas consultas</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-book" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Agendar Consulta</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.docCard}>
          <Image source={{ uri: doctor.photo }} style={styles.photo} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{doctor.name}</Text>
            <Text style={styles.spec}>{doctor.specialty}</Text>
          </View>
        </View>

        <Text style={styles.section}>Tipo de consulta</Text>
        <View style={styles.typeRow}>
          <Pressable
            testID="type-video"
            onPress={() => setType("video")}
            style={[styles.typeCard, type === "video" && styles.typeCardActive]}
          >
            <Ionicons name="videocam" size={22} color={type === "video" ? COLORS.brandPrimary : COLORS.muted} />
            <Text style={[styles.typeTitle, type === "video" && { color: COLORS.brandPrimary }]}>Vídeo</Text>
            <Text style={styles.typePrice}>R$ {doctor.price}</Text>
          </Pressable>
          <Pressable
            testID="type-presencial"
            onPress={() => setType("presencial")}
            style={[styles.typeCard, type === "presencial" && styles.typeCardActive]}
          >
            <Ionicons name="location" size={22} color={type === "presencial" ? COLORS.brandPrimary : COLORS.muted} />
            <Text style={[styles.typeTitle, type === "presencial" && { color: COLORS.brandPrimary }]}>Presencial</Text>
            <Text style={styles.typePrice}>R$ {doctor.price + 60}</Text>
          </Pressable>
        </View>

        <Text style={styles.section}>Escolha o dia</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: SPACING.sm }}>
          {DAYS.map((d, i) => (
            <Pressable
              key={i}
              testID={`day-${i}`}
              disabled={!d.available}
              onPress={() => setDayIdx(i)}
              style={[
                styles.dayCard,
                dayIdx === i && styles.dayCardActive,
                !d.available && styles.dayCardDisabled,
              ]}
            >
              <Text style={[styles.dayText, dayIdx === i && { color: "#fff" }, !d.available && { color: COLORS.muted }]}>
                {d.day}
              </Text>
              <Text style={[styles.dayNum, dayIdx === i && { color: "#fff" }, !d.available && { color: COLORS.muted }]}>
                {d.num}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.section}>Horários disponíveis</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((t) => (
            <Pressable
              key={t}
              testID={`time-${t}`}
              onPress={() => setTime(t)}
              style={[styles.timeChip, time === t && styles.timeChipActive]}
            >
              <Text style={[styles.timeText, time === t && { color: "#fff" }]}>{t}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.stickyWrap}>
        <View style={styles.sticky}>
          <View>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.priceValue}>R$ {type === "video" ? doctor.price : doctor.price + 60}</Text>
          </View>
          <Pressable
            testID="confirm-book"
            disabled={!time}
            onPress={() => router.push(`/(patient)/payment?doctor=${doctor.id}`)}
            style={[styles.confirmBtn, !time && { opacity: 0.5 }]}
          >
            <Text style={styles.confirmText}>Ir para pagamento</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  back: { width: 40 },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: 120 },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.brandTertiary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  photo: { width: 56, height: 56, borderRadius: 28 },
  name: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  spec: { fontSize: FONT.sm, color: COLORS.brandDark },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.lg, marginBottom: SPACING.md },
  typeRow: { flexDirection: "row", gap: SPACING.md },
  typeCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: "flex-start",
    gap: 4,
  },
  typeCardActive: { borderColor: COLORS.brandPrimary, backgroundColor: COLORS.brandTertiary },
  typeTitle: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.xs },
  typePrice: { fontSize: FONT.sm, color: COLORS.muted, fontWeight: "600" },
  dayCard: {
    width: 60,
    height: 76,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  dayCardActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  dayCardDisabled: { backgroundColor: COLORS.surfaceSecondary, borderColor: COLORS.border },
  dayText: { fontSize: FONT.sm, fontWeight: "600", color: COLORS.muted },
  dayNum: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface, marginTop: 4 },
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  timeChip: {
    width: "22%",
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  timeChipActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  timeText: { fontWeight: "600", color: COLORS.onSurface },
  stickyWrap: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: COLORS.border },
  sticky: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  priceLabel: { fontSize: FONT.sm, color: COLORS.muted },
  priceValue: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface },
  confirmBtn: {
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
    ...SHADOW.card,
  },
  confirmText: { color: "#fff", fontWeight: "700", fontSize: FONT.base },
  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: SPACING.xl },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.strong,
  },
  successTitle: { fontSize: 26, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.lg },
  successDesc: { fontSize: FONT.base, color: COLORS.muted, marginTop: SPACING.sm, textAlign: "center", lineHeight: 22 },
  summaryBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.xl,
    width: "100%",
  },
  sumPhoto: { width: 44, height: 44, borderRadius: 22 },
  sumName: { fontWeight: "700", color: COLORS.onSurface },
  sumSpec: { color: COLORS.muted, fontSize: FONT.sm },
  sumPrice: { color: COLORS.brandPrimary, fontWeight: "800", fontSize: FONT.lg },
  successBtn: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    width: "100%",
    alignItems: "center",
  },
  successBtnText: { color: "#fff", fontWeight: "700", fontSize: FONT.base },
  linkTop: { color: COLORS.brandPrimary, fontWeight: "600", marginTop: SPACING.md },
});
