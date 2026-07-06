import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const ITEMS = [
  {
    id: "n1",
    icon: "videocam" as const,
    color: COLORS.brandPrimary,
    bg: COLORS.brandTertiary,
    title: "Sua consulta começa em 30min",
    desc: "Dra. Ana Ribeiro • Cardiologia",
    time: "há 5 min",
    unread: true,
  },
  {
    id: "n2",
    icon: "document-text" as const,
    color: "#AF52DE",
    bg: "#F4E9FA",
    title: "Nova receita disponível",
    desc: "Dra. Beatriz Souza prescreveu 1 medicamento",
    time: "há 2h",
    unread: true,
  },
  {
    id: "n3",
    icon: "flask" as const,
    color: "#34C759",
    bg: "#E1F8E7",
    title: "Resultado de exame pronto",
    desc: "Hemograma Completo já está disponível",
    time: "ontem",
    unread: false,
  },
  {
    id: "n4",
    icon: "gift" as const,
    color: COLORS.brandSecondary,
    bg: "#FFEBD1",
    title: "Cashback creditado 🎉",
    desc: "R$ 18,00 na sua carteira",
    time: "2 dias",
    unread: false,
  },
  {
    id: "n5",
    icon: "star" as const,
    color: "#FFCC00",
    bg: "#FFF7D6",
    title: "Avalie sua consulta",
    desc: "Como foi seu atendimento com Dr. Carlos Mendes?",
    time: "3 dias",
    unread: false,
  },
];

export default function Notifications() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-notif" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Notificações</Text>
        <Pressable style={styles.back}>
          <Text style={styles.markAll}>Ler todas</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {ITEMS.map((n, i) => (
          <Animated.View
            key={n.id}
            entering={FadeInDown.delay(i * 80).springify()}
          >
            <Pressable testID={`notif-${n.id}`} style={[styles.card, n.unread && styles.cardUnread]}>
              <View style={[styles.iconBox, { backgroundColor: n.bg }]}>
                <Ionicons name={n.icon} size={22} color={n.color} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{n.title}</Text>
                  {n.unread && <View style={styles.dot} />}
                </View>
                <Text style={styles.desc} numberOfLines={2}>{n.desc}</Text>
                <Text style={styles.time}>{n.time}</Text>
              </View>
            </Pressable>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(500)} style={styles.emptyBottom}>
          <AnimatedPingo variant="thumbs_up" size={100} animate="breath" />
          <Text style={styles.emptyBottomText}>Você está em dia! 🎉</Text>
        </Animated.View>
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
  back: { minWidth: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  markAll: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  card: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  cardUnread: { borderLeftWidth: 3, borderLeftColor: COLORS.brandPrimary },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardTitle: { flex: 1, fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.brandPrimary },
  desc: { color: COLORS.onSurfaceSecondary, fontSize: FONT.sm, marginTop: 2 },
  time: { color: COLORS.muted, fontSize: 11, marginTop: 4, fontWeight: "600" },
  emptyBottom: { alignItems: "center", marginTop: SPACING.xl, opacity: 0.9 },
  emptyBottomText: { color: COLORS.muted, marginTop: SPACING.sm, fontWeight: "600" },
});
