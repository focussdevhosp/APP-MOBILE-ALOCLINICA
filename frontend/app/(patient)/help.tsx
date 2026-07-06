import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const FAQS = [
  { q: "Como agendo minha primeira consulta?", a: "Toque em Buscar ou em Especialidades na tela inicial, escolha o médico e o horário." },
  { q: "As receitas são válidas em farmácias?", a: "Sim! Todas as receitas têm assinatura digital ICP-Brasil válida nacionalmente." },
  { q: "Posso reembolsar pelo plano?", a: "Emitimos recibos com dados do CRM que podem ser usados no reembolso do seu plano." },
  { q: "Como cancelar uma consulta?", a: "Vá em Consultas → toque na consulta → Cancelar. Reembolso em até 5 dias úteis." },
  { q: "É seguro fazer videoconsulta?", a: "Sim, usamos criptografia ponta-a-ponta. Suas informações são protegidas pela LGPD." },
];

export default function Help() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-help" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Ajuda</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp} style={styles.hero}>
          <AnimatedPingo variant="thumbs_up" size={130} animate="alive" />
          <Text style={styles.heroTitle}>Como podemos ajudar?</Text>
          <Text style={styles.heroDesc}>Escolha uma opção abaixo ou fale conosco</Text>
        </Animated.View>

        <View style={styles.actions}>
          <Action icon="chatbubbles" color={COLORS.brandPrimary} bg={COLORS.brandTertiary} label="Chat" onPress={() => {}} testID="a-chat" />
          <Action icon="call" color={COLORS.success} bg="#E1F8E7" label="Ligar" onPress={() => {}} testID="a-call" />
          <Action icon="mail" color={COLORS.brandSecondary} bg="#FFEBD1" label="Email" onPress={() => {}} testID="a-mail" />
          <Action icon="logo-whatsapp" color="#25D366" bg="#E1F8E7" label="WhatsApp" onPress={() => {}} testID="a-wa" />
        </View>

        <Text style={styles.section}>Perguntas frequentes</Text>
        {FAQS.map((f, i) => (
          <Animated.View key={i} entering={FadeInUp.delay(i * 80)} style={styles.faq}>
            <View style={{ flex: 1 }}>
              <Text style={styles.faqQ}>{f.q}</Text>
              <Text style={styles.faqA}>{f.a}</Text>
            </View>
          </Animated.View>
        ))}

        <View style={styles.pingoCard}>
          <AnimatedPingo variant="clipboard" size={64} animate="breath" />
          <View style={{ flex: 1 }}>
            <Text style={styles.pingoT}>Não achou o que procurava?</Text>
            <Text style={styles.pingoD}>Pergunte ao Pingo AI, ele te ajuda 24/7</Text>
          </View>
          <Pressable onPress={() => router.push("/(patient)/pingo")} style={styles.pingoBtn}>
            <Ionicons name="chatbubble" size={18} color="#fff" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Action({ icon, color, bg, label, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.actionBtn}>
      <View style={[styles.actionIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
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
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  hero: { alignItems: "center", marginBottom: SPACING.lg },
  heroTitle: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.sm },
  heroDesc: { color: COLORS.muted, marginTop: 4 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.lg },
  actionBtn: { alignItems: "center", flex: 1 },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  actionLabel: { fontSize: FONT.sm, fontWeight: "600", color: COLORS.onSurface },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.md, marginBottom: SPACING.md },
  faq: {
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  faqQ: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  faqA: { color: COLORS.onSurfaceSecondary, marginTop: 4, lineHeight: 20, fontSize: FONT.sm },
  pingoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.brandTertiary,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  pingoT: { fontWeight: "700", color: COLORS.brandDark, fontSize: FONT.base },
  pingoD: { color: COLORS.onBrandTertiary, fontSize: FONT.sm, marginTop: 2 },
  pingoBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
});
