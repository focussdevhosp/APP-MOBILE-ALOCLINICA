import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const ITEMS = [
  { id: "n1", icon: "person-add" as const, color: COLORS.brandPrimary, bg: COLORS.brandTertiary, title: "Novo agendamento", desc: "Maria Silva agendou consulta para 15/05 às 09:00", time: "há 10 min", unread: true },
  { id: "n2", icon: "cash" as const, color: COLORS.success, bg: "#E1F8E7", title: "Pagamento recebido", desc: "R$ 180,00 de Ricardo Almeida", time: "há 1h", unread: true },
  { id: "n3", icon: "star" as const, color: "#FFCC00", bg: "#FFF7D6", title: "Nova avaliação 5 ⭐", desc: "Fernanda Costa avaliou seu atendimento", time: "há 3h", unread: false },
  { id: "n4", icon: "chatbubbles" as const, color: "#AF52DE", bg: "#F4E9FA", title: "Mensagem de paciente", desc: "João Pedro enviou uma nova mensagem", time: "ontem", unread: false },
  { id: "n5", icon: "trending-up" as const, color: COLORS.brandSecondary, bg: "#FFEBD1", title: "Meta atingida! 🎉", desc: "Você concluiu 20 consultas esta semana", time: "2 dias", unread: false },
];

export default function DoctorNotifications() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-dnotif" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Notificações</Text>
        <Pressable style={styles.back}>
          <Text style={styles.mark}>Ler todas</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {ITEMS.map((n, i) => (
          <Animated.View key={n.id} entering={FadeInDown.delay(i * 70).springify()}>
            <Pressable testID={`dnotif-${n.id}`} style={[styles.card, n.unread && styles.cardUnread]}>
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
        <Animated.View entering={FadeInDown.delay(500)} style={styles.bottom}>
          <AnimatedPingo variant="thumbs_up" size={90} animate="breath" />
          <Text style={styles.bottomText}>Excelente trabalho hoje! 💙</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: COLORS.border },
  back: { minWidth: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  mark: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  card: { flexDirection: "row", gap: SPACING.md, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.card },
  cardUnread: { borderLeftWidth: 3, borderLeftColor: COLORS.brandPrimary },
  iconBox: { width: 44, height: 44, borderRadius: RADIUS.md, alignItems: "center", justifyContent: "center" },
  rowTop: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardTitle: { flex: 1, fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.brandPrimary },
  desc: { color: COLORS.onSurfaceSecondary, fontSize: FONT.sm, marginTop: 2 },
  time: { color: COLORS.muted, fontSize: 11, marginTop: 4, fontWeight: "600" },
  bottom: { alignItems: "center", marginTop: SPACING.xl },
  bottomText: { color: COLORS.muted, marginTop: SPACING.sm, fontWeight: "600" },
});
