import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENT_ME } from "@/src/mockData";

export default function Profile() {
  const router = useRouter();

  const logout = () => router.replace("/role-select");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Perfil</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image source={{ uri: PATIENT_ME.photo }} style={styles.avatar} />
          <Text style={styles.name}>{PATIENT_ME.name}</Text>
          <Text style={styles.email}>{PATIENT_ME.email}</Text>
          <Pressable style={styles.editBtn}>
            <Ionicons name="pencil" size={14} color={COLORS.brandPrimary} />
            <Text style={styles.editText}>Editar perfil</Text>
          </Pressable>
        </View>

        {/* Sections */}
        <Text style={styles.section}>Conta</Text>
        <Menu icon="person-outline" title="Dados pessoais" onPress={() => {}} testID="m-personal" />
        <Menu icon="card-outline" title="Formas de pagamento" onPress={() => {}} testID="m-payment" />
        <Menu icon="ribbon-outline" title="Plano de saúde" onPress={() => {}} testID="m-plan" />
        <Menu icon="people-outline" title="Dependentes" onPress={() => {}} testID="m-deps" />

        <Text style={styles.section}>Preferências</Text>
        <Menu icon="notifications-outline" title="Notificações" onPress={() => {}} testID="m-notif" />
        <Menu icon="language-outline" title="Idioma" value="Português" onPress={() => {}} testID="m-lang" />
        <Menu icon="moon-outline" title="Aparência" value="Sistema" onPress={() => {}} testID="m-theme" />

        <Text style={styles.section}>Suporte</Text>
        <Menu icon="help-circle-outline" title="Central de ajuda" onPress={() => {}} testID="m-help" />
        <Menu icon="chatbubble-outline" title="Fale conosco" onPress={() => {}} testID="m-contact" />
        <Menu icon="document-text-outline" title="Termos e Privacidade" onPress={() => {}} testID="m-terms" />
        <Menu icon="star-outline" title="Avaliar app" onPress={() => {}} testID="m-rate" />

        <Pressable testID="logout" onPress={logout} style={styles.logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </Pressable>
        <Text style={styles.version}>Alô Clínica v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Menu({ icon, title, value, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.menuItem}>
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
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.xl,
    alignItems: "center",
    marginBottom: SPACING.lg,
    ...SHADOW.card,
  },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: COLORS.brandTertiary },
  name: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.md },
  email: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  editBtn: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginTop: SPACING.md,
    backgroundColor: COLORS.brandTertiary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  editText: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  section: {
    fontSize: FONT.sm,
    fontWeight: "700",
    color: COLORS.muted,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
    ...SHADOW.card,
  },
  menuTitle: { flex: 1, fontSize: FONT.base, fontWeight: "500", color: COLORS.onSurface },
  menuValue: { fontSize: FONT.sm, color: COLORS.muted, marginRight: 4 },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: "#FFE0DE",
  },
  logoutText: { color: COLORS.error, fontWeight: "700", fontSize: FONT.base },
  version: { textAlign: "center", color: COLORS.muted, fontSize: FONT.sm, marginTop: SPACING.lg },
});
