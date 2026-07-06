import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const CARDS = [
  { id: "c1", brand: "Visa", last4: "4291", exp: "12/28", holder: "Camila Souza", primary: true },
  { id: "c2", brand: "Mastercard", last4: "8123", exp: "07/26", holder: "Camila Souza", primary: false },
];

const BRAND_COLORS: Record<string, string> = {
  Visa: "#1A1F71",
  Mastercard: "#EB001B",
  Amex: "#006FCF",
  Elo: "#FFB800",
};

export default function PaymentMethods() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-pm" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Métodos de pagamento</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Cartões salvos</Text>
        {CARDS.map((c, i) => (
          <Animated.View
            key={c.id}
            entering={FadeInUp.delay(i * 100).springify()}
            style={[styles.card, { backgroundColor: BRAND_COLORS[c.brand] }]}
          >
            <View style={styles.cardTop}>
              <Text style={styles.brand}>{c.brand}</Text>
              {c.primary && (
                <View style={styles.primaryPill}>
                  <Text style={styles.primaryText}>Principal</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardNumber}>•••• •••• •••• {c.last4}</Text>
            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.cardLabel}>Titular</Text>
                <Text style={styles.cardValue}>{c.holder}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Validade</Text>
                <Text style={styles.cardValue}>{c.exp}</Text>
              </View>
              <Pressable style={styles.trash} testID={`del-${c.id}`}>
                <Ionicons name="trash-outline" size={18} color="#fff" />
              </Pressable>
            </View>
          </Animated.View>
        ))}

        <Pressable testID="add-card" style={styles.addBtn}>
          <Ionicons name="add-circle" size={22} color={COLORS.brandPrimary} />
          <Text style={styles.addText}>Adicionar novo cartão</Text>
        </Pressable>

        <Text style={styles.section}>Outros métodos</Text>
        <View style={styles.method}>
          <View style={[styles.methodIcon, { backgroundColor: "#E1F8E7" }]}>
            <Ionicons name="qr-code" size={22} color={COLORS.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>Pix</Text>
            <Text style={styles.methodDesc}>Pagamento instantâneo</Text>
          </View>
          <View style={styles.enabled}>
            <Text style={styles.enabledText}>Ativo</Text>
          </View>
        </View>

        <View style={styles.method}>
          <View style={[styles.methodIcon, { backgroundColor: COLORS.brandTertiary }]}>
            <Ionicons name="wallet" size={22} color={COLORS.brandPrimary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.methodTitle}>Carteira Alô Clínica</Text>
            <Text style={styles.methodDesc}>Saldo: R$ 78,00</Text>
          </View>
          <Pressable>
            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </Pressable>
        </View>

        <View style={styles.secure}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.success} />
          <Text style={styles.secureText}>Seus dados são criptografados e protegidos pelo PCI-DSS.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  back: { width: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginBottom: SPACING.md, marginTop: SPACING.md },
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    minHeight: 180,
    ...SHADOW.strong,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brand: { color: "#fff", fontSize: FONT.lg, fontWeight: "800", letterSpacing: 1 },
  primaryPill: { backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.pill },
  primaryText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  cardNumber: { color: "#fff", fontSize: 22, fontWeight: "700", letterSpacing: 2, marginVertical: SPACING.lg },
  cardBottom: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: SPACING.md },
  cardLabel: { color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: "600", letterSpacing: 1 },
  cardValue: { color: "#fff", fontWeight: "700", marginTop: 2 },
  trash: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  addBtn: {
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.brandPrimary,
    backgroundColor: COLORS.brandTertiary,
  },
  addText: { color: COLORS.brandPrimary, fontWeight: "700", fontSize: FONT.base },
  method: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  methodIcon: { width: 44, height: 44, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  methodTitle: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  methodDesc: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  enabled: { backgroundColor: "#E1F8E7", paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.pill },
  enabledText: { color: COLORS.success, fontSize: FONT.sm, fontWeight: "700" },
  secure: {
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "center",
    backgroundColor: "#E1F8E7",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginTop: SPACING.lg,
  },
  secureText: { flex: 1, color: COLORS.success, fontSize: FONT.sm, lineHeight: 20 },
});
