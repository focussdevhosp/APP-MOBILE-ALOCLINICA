import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTOR_ME } from "@/src/mockData";

export default function DoctorProfile() {
  const router = useRouter();
  const logout = () => router.replace("/role-select");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.card}>
          <Image source={{ uri: DOCTOR_ME.photo }} style={styles.avatar} />
          <Text style={styles.name}>{DOCTOR_ME.name}</Text>
          <Text style={styles.spec}>{DOCTOR_ME.specialty}</Text>
          <Text style={styles.crm}>{DOCTOR_ME.crm}</Text>

          <View style={styles.stats}>
            <Stat value={DOCTOR_ME.totalPatients.toString()} label="Pacientes" />
            <View style={styles.divider} />
            <Stat value={DOCTOR_ME.rating.toString()} label="Nota" icon="star" />
            <View style={styles.divider} />
            <Stat value={DOCTOR_ME.totalConsults.toString()} label="Consultas" />
          </View>
        </View>

        <Text style={styles.section}>Configurações profissionais</Text>
        <Menu icon="calendar-outline" title="Horários de atendimento" onPress={() => {}} testID="m-hours" />
        <Menu icon="pricetag-outline" title="Valores das consultas" value="R$ 180" onPress={() => {}} testID="m-prices" />
        <Menu icon="videocam-outline" title="Configurações de vídeo" onPress={() => {}} testID="m-video" />
        <Menu icon="document-outline" title="Certificado digital" onPress={() => {}} testID="m-cert" />
        <Menu icon="library-outline" title="Meus receituários" onPress={() => {}} testID="m-tpl" />

        <Text style={styles.section}>Conta</Text>
        <Menu icon="wallet-outline" title="Dados bancários" onPress={() => {}} testID="m-bank" />
        <Menu icon="notifications-outline" title="Notificações" onPress={() => {}} testID="m-not" />
        <Menu icon="lock-closed-outline" title="Privacidade" onPress={() => {}} testID="m-priv" />
        <Menu icon="help-circle-outline" title="Suporte" onPress={() => {}} testID="m-sup" />

        <Pressable testID="d-logout" onPress={logout} style={styles.logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label, icon }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        {icon && <Ionicons name={icon} size={16} color="#FFCC00" />}
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Menu({ icon, title, value, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.menu}>
      <Ionicons name={icon} size={20} color={COLORS.onSurfaceSecondary} />
      <Text style={styles.menuTitle}>{title}</Text>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface, marginBottom: SPACING.lg },
  card: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.xl, alignItems: "center", ...SHADOW.card },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: COLORS.brandTertiary },
  name: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.md },
  spec: { fontSize: FONT.base, color: COLORS.brandPrimary, fontWeight: "600", marginTop: 2 },
  crm: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  stats: { flexDirection: "row", marginTop: SPACING.lg, width: "100%", paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.divider },
  divider: { width: 1, backgroundColor: COLORS.divider },
  statValue: { fontSize: FONT.lg, fontWeight: "800", color: COLORS.onSurface },
  statLabel: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  section: { fontSize: FONT.sm, fontWeight: "700", color: COLORS.muted, marginTop: SPACING.lg, marginBottom: SPACING.sm, textTransform: "uppercase", letterSpacing: 0.5 },
  menu: {
    flexDirection: "row", alignItems: "center", gap: SPACING.md,
    backgroundColor: "#fff", borderRadius: RADIUS.md,
    paddingVertical: SPACING.md, paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs, ...SHADOW.card,
  },
  menuTitle: { flex: 1, fontSize: FONT.base, fontWeight: "500", color: COLORS.onSurface },
  menuValue: { fontSize: FONT.sm, color: COLORS.muted, marginRight: 4 },
  logout: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SPACING.sm,
    marginTop: SPACING.lg, padding: SPACING.md, borderRadius: RADIUS.md, backgroundColor: "#FFE0DE",
  },
  logoutText: { color: COLORS.error, fontWeight: "700" },
});
