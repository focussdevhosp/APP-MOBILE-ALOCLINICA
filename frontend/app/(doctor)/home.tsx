import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PingoAvatar from "@/src/components/PingoAvatar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTOR_ME, TODAY_AGENDA, EARNINGS } from "@/src/mockData";

export default function DoctorHome() {
  const router = useRouter();
  const upcoming = TODAY_AGENDA.filter((a) => a.status !== "concluida");
  const concluded = TODAY_AGENDA.filter((a) => a.status === "concluida").length;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.md, flex: 1 }}>
            <Image source={{ uri: DOCTOR_ME.photo }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hello}>Bem-vindo(a) 👋</Text>
              <Text style={styles.userName}>{DOCTOR_ME.name}</Text>
              <Text style={styles.userMeta}>{DOCTOR_ME.specialty} · {DOCTOR_ME.crm}</Text>
            </View>
          </View>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.onSurface} />
            <View style={styles.dot} />
          </Pressable>
        </View>

        {/* Summary */}
        <LinearGradient
          colors={[COLORS.brandPrimary, COLORS.brandDark]}
          style={styles.summary}
        >
          <Text style={styles.summaryLabel}>RESUMO DE HOJE</Text>
          <View style={styles.summaryGrid}>
            <SumStat value={TODAY_AGENDA.length.toString()} label="Consultas" />
            <View style={styles.sumDiv} />
            <SumStat value={concluded.toString()} label="Concluídas" />
            <View style={styles.sumDiv} />
            <SumStat value={`R$ ${EARNINGS.today}`} label="Ganhos" />
          </View>
        </LinearGradient>

        {/* Quick actions */}
        <View style={styles.quickRow}>
          <Quick icon="videocam" color={COLORS.brandPrimary} bg={COLORS.brandTertiary} label="Consulta" onPress={() => router.push("/(doctor)/consultation")} testID="d-q-video" />
          <Quick icon="document-text" color="#AF52DE" bg="#F4E9FA" label="Receita" onPress={() => router.push("/(doctor)/prescription-writer")} testID="d-q-rx" />
          <Quick icon="calendar" color={COLORS.success} bg="#E1F8E7" label="Agenda" onPress={() => router.push("/(doctor)/schedule")} testID="d-q-agenda" />
          <Quick icon="people" color={COLORS.brandSecondary} bg="#FFEBD1" label="Pacientes" onPress={() => router.push("/(doctor)/patients")} testID="d-q-pts" />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.section}>Fila de espera</Text>
          <Pressable onPress={() => router.push("/(doctor)/schedule")}>
            <Text style={styles.link}>Ver tudo</Text>
          </Pressable>
        </View>

        {upcoming.map((a, idx) => (
          <View key={a.id} style={styles.card} testID={`ag-${a.id}`}>
            <View style={styles.timePill}>
              <Text style={styles.timePillText}>{a.time}</Text>
            </View>
            <Image source={{ uri: a.photo }} style={styles.ptPhoto} />
            <View style={{ flex: 1 }}>
              <Text style={styles.ptName}>{a.patient}</Text>
              <Text style={styles.ptReason}>{a.reason}</Text>
              {a.status === "em_andamento" && (
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>Aguardando você</Text>
                </View>
              )}
            </View>
            {idx === 0 ? (
              <Pressable
                testID={`start-${a.id}`}
                onPress={() => router.push("/(doctor)/consultation")}
                style={styles.startBtn}
              >
                <Ionicons name="videocam" size={16} color="#fff" />
                <Text style={styles.startText}>Iniciar</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => router.push(`/(doctor)/patient/${a.patientId}`)}
                style={styles.eyeBtn}
              >
                <Ionicons name="eye-outline" size={20} color={COLORS.brandPrimary} />
              </Pressable>
            )}
          </View>
        ))}

        <View style={styles.pingoCard}>
          <PingoAvatar size={56} />
          <View style={{ flex: 1 }}>
            <Text style={styles.pingoTitle}>Pingo Insights 📊</Text>
            <Text style={styles.pingoDesc}>Você atendeu 15% mais pacientes esta semana!</Text>
          </View>
        </View>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SumStat({ value, label }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={styles.sumValue}>{value}</Text>
      <Text style={styles.sumLabel}>{label}</Text>
    </View>
  );
}

function Quick({ icon, color, bg, label, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.quickBtn}>
      <View style={[styles.quickIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: SPACING.lg },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  hello: { fontSize: FONT.sm, color: COLORS.muted },
  userName: { fontSize: FONT.lg, fontWeight: "800", color: COLORS.onSurface },
  userMeta: { fontSize: 11, color: COLORS.muted, marginTop: 1 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", ...SHADOW.card },
  dot: { position: "absolute", top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  summary: { borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.lg, ...SHADOW.strong },
  summaryLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "700", letterSpacing: 1, fontSize: 11 },
  summaryGrid: { flexDirection: "row", marginTop: SPACING.md, alignItems: "center" },
  sumValue: { color: "#fff", fontSize: FONT.xl, fontWeight: "800" },
  sumLabel: { color: "rgba(255,255,255,0.85)", fontSize: FONT.sm, marginTop: 2 },
  sumDiv: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.2)" },
  quickRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.md },
  quickBtn: { alignItems: "center", flex: 1 },
  quickIcon: { width: 56, height: 56, borderRadius: RADIUS.pill, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  quickLabel: { fontSize: FONT.sm, color: COLORS.onSurface, fontWeight: "600" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: SPACING.md, marginBottom: SPACING.md },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  link: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  card: { flexDirection: "row", alignItems: "center", gap: SPACING.md, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.card },
  timePill: { backgroundColor: COLORS.brandTertiary, paddingHorizontal: SPACING.sm, paddingVertical: 6, borderRadius: RADIUS.sm },
  timePillText: { color: COLORS.brandPrimary, fontWeight: "700", fontSize: FONT.sm },
  ptPhoto: { width: 44, height: 44, borderRadius: 22 },
  ptName: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  ptReason: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  liveBadge: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
  liveText: { color: COLORS.success, fontWeight: "700", fontSize: 11 },
  startBtn: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: COLORS.brandPrimary, paddingHorizontal: SPACING.md, paddingVertical: 8, borderRadius: RADIUS.pill },
  startText: { color: "#fff", fontWeight: "700", fontSize: FONT.sm },
  eyeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.brandTertiary, alignItems: "center", justifyContent: "center" },
  pingoCard: { flexDirection: "row", alignItems: "center", gap: SPACING.md, backgroundColor: COLORS.brandTertiary, borderRadius: RADIUS.lg, padding: SPACING.lg, marginTop: SPACING.lg },
  pingoTitle: { fontSize: FONT.base, fontWeight: "700", color: COLORS.brandDark },
  pingoDesc: { fontSize: FONT.sm, color: COLORS.onBrandTertiary, marginTop: 2 },
});
