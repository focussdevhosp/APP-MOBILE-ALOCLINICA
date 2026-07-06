import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { EARNINGS } from "@/src/mockData";

export default function Earnings() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Meus Ganhos</Text>

        <LinearGradient
          colors={[COLORS.brandPrimary, COLORS.brandDark]}
          style={styles.balance}
        >
          <Text style={styles.balanceLabel}>SALDO DISPONÍVEL</Text>
          <Text style={styles.balanceValue}>R$ {EARNINGS.month.toLocaleString("pt-BR")}</Text>
          <View style={styles.balanceRow}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Ionicons name="trending-up" size={16} color="#8FF0A8" />
              <Text style={styles.balanceChange}>+18% este mês</Text>
            </View>
            <Pressable style={styles.withdrawBtn} testID="withdraw">
              <Text style={styles.withdrawText}>Sacar</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <StatCard label="Hoje" value={EARNINGS.today} icon="today" color={COLORS.brandPrimary} />
          <StatCard label="Semana" value={EARNINGS.week} icon="calendar" color={COLORS.brandSecondary} />
          <StatCard label="Pendente" value={EARNINGS.pending} icon="time" color={COLORS.warning} />
        </View>

        {/* Chart placeholder */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.section}>Últimos 7 dias</Text>
            <Pressable>
              <Text style={styles.link}>Detalhes</Text>
            </Pressable>
          </View>
          <View style={styles.bars}>
            {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
              <View key={i} style={styles.barCol}>
                <View style={[styles.bar, { height: `${h}%`, backgroundColor: i === 5 ? COLORS.brandPrimary : COLORS.brandTertiary }]} />
                <Text style={styles.barLabel}>{["S", "T", "Q", "Q", "S", "S", "D"][i]}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.section}>Últimas transações</Text>
        {EARNINGS.history.map((h) => (
          <View key={h.id} style={styles.txCard}>
            <View style={styles.txIcon}>
              <Ionicons name="cash-outline" size={20} color={COLORS.success} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.txName}>{h.patient}</Text>
              <Text style={styles.txDate}>{h.date}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.txAmount}>+ R$ {h.amount}</Text>
              <Text
                style={[
                  styles.txStatus,
                  { color: h.status === "pago" ? COLORS.success : COLORS.warning },
                ]}
              >
                {h.status === "pago" ? "Pago" : "Pendente"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>R$ {value.toLocaleString("pt-BR")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface, marginBottom: SPACING.lg },
  balance: { borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOW.strong },
  balanceLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "700", letterSpacing: 1, fontSize: 11 },
  balanceValue: { color: "#fff", fontSize: 34, fontWeight: "800", marginTop: SPACING.xs },
  balanceRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: SPACING.md },
  balanceChange: { color: "#8FF0A8", fontWeight: "600" },
  withdrawBtn: { backgroundColor: "#fff", paddingHorizontal: SPACING.lg, paddingVertical: 8, borderRadius: RADIUS.pill },
  withdrawText: { color: COLORS.brandPrimary, fontWeight: "700" },
  statsGrid: { flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md },
  statCard: { flex: 1, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, ...SHADOW.card },
  statLabel: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 4, fontWeight: "600" },
  statValue: { fontSize: FONT.base, fontWeight: "800", color: COLORS.onSurface, marginTop: 2 },
  chartCard: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.md, ...SHADOW.card },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.md },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.md, marginBottom: SPACING.md },
  link: { color: COLORS.brandPrimary, fontWeight: "600" },
  bars: { flexDirection: "row", alignItems: "flex-end", height: 140, gap: SPACING.sm, justifyContent: "space-between" },
  barCol: { flex: 1, alignItems: "center", height: "100%", justifyContent: "flex-end" },
  bar: { width: "70%", borderRadius: RADIUS.sm, minHeight: 8 },
  barLabel: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 6, fontWeight: "600" },
  txCard: { flexDirection: "row", alignItems: "center", gap: SPACING.md, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.card },
  txIcon: { width: 40, height: 40, borderRadius: RADIUS.md, backgroundColor: "#E1F8E7", alignItems: "center", justifyContent: "center" },
  txName: { fontWeight: "700", color: COLORS.onSurface },
  txDate: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  txAmount: { fontWeight: "800", color: COLORS.success, fontSize: FONT.base },
  txStatus: { fontSize: FONT.sm, fontWeight: "600", marginTop: 2 },
});
