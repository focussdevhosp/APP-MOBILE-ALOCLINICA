import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENT_ME, PRESCRIPTIONS, EXAMS, APPOINTMENTS } from "@/src/mockData";

export default function Records() {
  const router = useRouter();
  const completedCount = APPOINTMENTS.filter((a) => a.status === "completed").length;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Meu Prontuário</Text>

        {/* Personal Health */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="fitness" size={20} color={COLORS.brandPrimary} />
            <Text style={styles.cardTitle}>Dados de saúde</Text>
          </View>
          <View style={styles.grid}>
            <StatBox icon="water" label="Tipo Sanguíneo" value={PATIENT_ME.bloodType} color={COLORS.error} />
            <StatBox icon="resize" label="Altura" value={PATIENT_ME.height} color={COLORS.brandPrimary} />
            <StatBox icon="barbell" label="Peso" value={PATIENT_ME.weight} color={COLORS.brandSecondary} />
            <StatBox icon="calendar" label="Nascimento" value={PATIENT_ME.birthdate} color={COLORS.success} />
          </View>
        </View>

        {/* Allergies */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="warning" size={20} color={COLORS.error} />
            <Text style={styles.cardTitle}>Alergias</Text>
          </View>
          <View style={styles.chipRow}>
            {PATIENT_ME.allergies.length === 0 ? (
              <Text style={styles.emptyRow}>Nenhuma alergia registrada</Text>
            ) : (
              PATIENT_ME.allergies.map((a) => (
                <View key={a} style={[styles.chip, { backgroundColor: "#FFE0DE" }]}>
                  <Text style={[styles.chipText, { color: COLORS.error }]}>{a}</Text>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Menu */}
        <Text style={styles.section}>Registros</Text>
        <MenuItem
          icon="document-text"
          color="#AF52DE"
          bg="#F4E9FA"
          title="Receitas"
          desc={`${PRESCRIPTIONS.length} receita(s) disponíveis`}
          onPress={() => router.push("/(patient)/prescriptions")}
          testID="menu-rx"
        />
        <MenuItem
          icon="flask"
          color="#34C759"
          bg="#E1F8E7"
          title="Exames"
          desc={`${EXAMS.length} exame(s) registrados`}
          onPress={() => router.push("/(patient)/exams")}
          testID="menu-exam"
        />
        <MenuItem
          icon="checkmark-circle"
          color={COLORS.brandPrimary}
          bg={COLORS.brandTertiary}
          title="Consultas realizadas"
          desc={`${completedCount} consulta(s)`}
          onPress={() => router.push("/(patient)/appointments")}
          testID="menu-consultas"
        />
        <MenuItem
          icon="pulse"
          color={COLORS.brandSecondary}
          bg="#FFEBD1"
          title="Vacinas"
          desc="Cartão de vacinação"
          onPress={() => {}}
          testID="menu-vaccine"
        />
        <MenuItem
          icon="heart"
          color={COLORS.error}
          bg="#FFE0DE"
          title="Doenças crônicas"
          desc="Nenhuma condição registrada"
          onPress={() => {}}
          testID="menu-chronic"
        />

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ icon, label, value, color }: any) {
  return (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function MenuItem({ icon, color, bg, title, desc, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.menu}>
      <View style={[styles.menuIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface, marginBottom: SPACING.lg },
  card: {
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginBottom: SPACING.md },
  cardTitle: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  statBox: {
    width: "47%",
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  statLabel: { fontSize: 11, color: COLORS.muted, marginTop: 6, fontWeight: "600" },
  statValue: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: 2 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  chip: { paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: RADIUS.pill },
  chipText: { fontWeight: "600", fontSize: FONT.sm },
  emptyRow: { color: COLORS.muted, fontSize: FONT.sm },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.md, marginBottom: SPACING.sm },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  menuIcon: { width: 44, height: 44, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  menuTitle: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  menuDesc: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
});
