import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PingoAvatar from "@/src/components/PingoAvatar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { APPOINTMENTS, Appointment } from "@/src/mockData";

type Tab = "upcoming" | "history";

export default function Appointments() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const router = useRouter();

  const filtered = APPOINTMENTS.filter((a) =>
    tab === "upcoming" ? a.status === "confirmed" || a.status === "pending" : a.status === "completed" || a.status === "cancelled"
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Consultas</Text>
        <Pressable testID="new-appt" onPress={() => router.push("/(patient)/search")} style={styles.newBtn}>
          <Ionicons name="add" size={22} color="#fff" />
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          testID="tab-upcoming"
          onPress={() => setTab("upcoming")}
          style={[styles.tab, tab === "upcoming" && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === "upcoming" && styles.tabTextActive]}>Próximas</Text>
        </Pressable>
        <Pressable
          testID="tab-history"
          onPress={() => setTab("history")}
          style={[styles.tab, tab === "history" && styles.tabActive]}
        >
          <Text style={[styles.tabText, tab === "history" && styles.tabTextActive]}>Histórico</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <PingoAvatar variant="sad" size={140} bg={COLORS.brandTertiary} />
            <Text style={styles.emptyTitle}>Nenhuma consulta {tab === "upcoming" ? "agendada" : "no histórico"}</Text>
            <Text style={styles.emptyDesc}>Quando você agendar uma consulta ela aparecerá aqui.</Text>
            <Pressable testID="empty-book" onPress={() => router.push("/(patient)/search")} style={styles.emptyBtn}>
              <Text style={styles.emptyBtnText}>Agendar Consulta</Text>
            </Pressable>
          </View>
        ) : (
          filtered.map((a) => <AppointmentCard key={a.id} item={a} router={router} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function AppointmentCard({ item, router }: { item: Appointment; router: any }) {
  const statusMeta = {
    confirmed: { color: COLORS.success, bg: "#E1F8E7", label: "Confirmada" },
    pending: { color: COLORS.warning, bg: "#FFF7D6", label: "Pendente" },
    completed: { color: COLORS.muted, bg: "#F0F0F5", label: "Concluída" },
    cancelled: { color: COLORS.error, bg: "#FFE0DE", label: "Cancelada" },
  }[item.status];

  return (
    <View testID={`appt-${item.id}`} style={styles.card}>
      <View style={styles.cardTop}>
        <Image source={{ uri: item.photo }} style={styles.photo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.docName}>{item.doctorName}</Text>
          <Text style={styles.docSpec}>{item.specialty}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusMeta.bg }]}>
          <Text style={[styles.statusText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.cardMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.muted} />
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.muted} />
          <Text style={styles.metaText}>{item.time}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons
            name={item.type === "video" ? "videocam-outline" : "location-outline"}
            size={16}
            color={COLORS.muted}
          />
          <Text style={styles.metaText}>{item.type === "video" ? "Vídeo" : "Presencial"}</Text>
        </View>
      </View>

      {item.status === "confirmed" && (
        <View style={styles.actions}>
          <Pressable
            testID={`join-${item.id}`}
            onPress={() => router.push("/(patient)/consultation")}
            style={styles.primaryAction}
          >
            <Ionicons name="videocam" size={18} color="#fff" />
            <Text style={styles.primaryActionText}>Entrar</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>Reagendar</Text>
          </Pressable>
        </View>
      )}
      {item.status === "completed" && (
        <View style={styles.actions}>
          <Pressable
            testID={`rx-${item.id}`}
            onPress={() => router.push("/(patient)/prescriptions")}
            style={[styles.secondaryAction, { flex: 1 }]}
          >
            <Text style={styles.secondaryActionText}>Ver receita</Text>
          </Pressable>
          <Pressable style={[styles.secondaryAction, { flex: 1 }]}>
            <Text style={styles.secondaryActionText}>Avaliar</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface },
  newBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.card,
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.surfaceTertiary,
    borderRadius: RADIUS.md,
    padding: 4,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 10, borderRadius: RADIUS.sm },
  tabActive: { backgroundColor: "#fff", ...SHADOW.card },
  tabText: { fontWeight: "600", color: COLORS.muted },
  tabTextActive: { color: COLORS.onSurface },
  list: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  empty: { alignItems: "center", paddingVertical: SPACING.xxxl },
  emptyTitle: { fontSize: FONT.lg, fontWeight: "700", marginTop: SPACING.lg, color: COLORS.onSurface },
  emptyDesc: { fontSize: FONT.sm, color: COLORS.muted, marginTop: SPACING.xs, textAlign: "center", maxWidth: 260 },
  emptyBtn: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
  },
  emptyBtnText: { color: "#fff", fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  cardTop: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  photo: { width: 52, height: 52, borderRadius: 26 },
  docName: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  docSpec: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  statusPill: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.pill },
  statusText: { fontSize: 11, fontWeight: "700" },
  divider: { height: 1, backgroundColor: COLORS.divider, marginVertical: SPACING.md },
  cardMeta: { flexDirection: "row", gap: SPACING.lg },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { fontSize: FONT.sm, color: COLORS.onSurfaceSecondary, fontWeight: "500" },
  actions: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md },
  primaryAction: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.brandPrimary,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
  },
  primaryActionText: { color: "#fff", fontWeight: "700" },
  secondaryAction: {
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionText: { color: COLORS.onSurface, fontWeight: "600" },
});
