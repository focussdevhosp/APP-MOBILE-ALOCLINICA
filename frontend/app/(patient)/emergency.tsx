import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeInUp,
} from "react-native-reanimated";
import { useEffect } from "react";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const SERVICES = [
  { icon: "call" as const, label: "SAMU", desc: "192", color: COLORS.error },
  { icon: "flame" as const, label: "Bombeiros", desc: "193", color: COLORS.brandSecondary },
  { icon: "shield" as const, label: "Polícia", desc: "190", color: COLORS.brandPrimary },
  { icon: "medical" as const, label: "Hospital", desc: "Ver perto de mim", color: COLORS.success },
];

export default function Emergency() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.15, { duration: 900, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 2 - pulse.value,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.error }}>
      <StatusBar style="light" />
      <LinearGradient colors={["#FF3B30", "#C1272D"]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <Pressable testID="back-sos" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Emergência</Text>
          <View style={styles.back} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInUp} style={styles.heroWrap}>
            <View style={styles.pulseContainer}>
              <Animated.View style={[styles.pulseCircle, pulseStyle]} />
              <Animated.View style={[styles.pulseCircle2, pulseStyle]} />
              <Pressable
                testID="sos-btn"
                onPressIn={() => setConfirming(true)}
                onPressOut={() => setConfirming(false)}
                style={styles.sosBtn}
              >
                <Text style={styles.sosText}>SOS</Text>
                <Text style={styles.sosSub}>Segure para ligar</Text>
              </Pressable>
            </View>

            <View style={styles.pingoWrap}>
              <AnimatedPingo variant="sad" size={90} animate="breath" />
              <Text style={styles.pingoText}>
                {confirming ? "Ligando para o SAMU..." : "Estou aqui com você"}
              </Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
            <Text style={styles.sectionTitle}>Serviços de emergência</Text>
            <View style={styles.servicesGrid}>
              {SERVICES.map((s) => (
                <Pressable key={s.label} testID={`svc-${s.label}`} style={styles.svc}>
                  <View style={[styles.svcIcon, { backgroundColor: s.color + "22" }]}>
                    <Ionicons name={s.icon} size={26} color={s.color} />
                  </View>
                  <Text style={styles.svcLabel}>{s.label}</Text>
                  <Text style={styles.svcDesc}>{s.desc}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
            <View style={styles.contactHeader}>
              <Ionicons name="people" size={20} color={COLORS.brandPrimary} />
              <Text style={styles.sectionTitle}>Contatos de confiança</Text>
            </View>
            <View style={styles.contact}>
              <View style={styles.contactAvatar}>
                <Text style={styles.contactInitial}>M</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>Mãe</Text>
                <Text style={styles.contactPhone}>(11) 98765-4321</Text>
              </View>
              <Pressable style={styles.callBtn}>
                <Ionicons name="call" size={18} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.contact}>
              <View style={styles.contactAvatar}>
                <Text style={styles.contactInitial}>J</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>João (marido)</Text>
                <Text style={styles.contactPhone}>(11) 99887-6655</Text>
              </View>
              <Pressable style={styles.callBtn}>
                <Ionicons name="call" size={18} color="#fff" />
              </Pressable>
            </View>
            <Pressable style={styles.addContact}>
              <Ionicons name="add-circle" size={20} color={COLORS.brandPrimary} />
              <Text style={styles.addContactText}>Adicionar contato</Text>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400)} style={styles.info}>
            <Ionicons name="location" size={18} color="#fff" />
            <Text style={styles.infoText}>
              Sua localização será compartilhada automaticamente com o serviço acionado.
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#fff", fontSize: FONT.lg, fontWeight: "800" },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  heroWrap: { alignItems: "center", marginBottom: SPACING.lg },
  pulseContainer: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
  },
  pulseCircle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  pulseCircle2: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  sosBtn: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.strong,
  },
  sosText: { color: COLORS.error, fontSize: 42, fontWeight: "900" },
  sosSub: { color: COLORS.error, fontSize: FONT.sm, fontWeight: "600", marginTop: 2 },
  pingoWrap: { flexDirection: "row", alignItems: "center", gap: SPACING.md, marginTop: SPACING.lg },
  pingoText: { color: "#fff", fontSize: FONT.base, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  contactHeader: { flexDirection: "row", alignItems: "center", gap: SPACING.sm, marginBottom: SPACING.md },
  sectionTitle: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface, marginBottom: SPACING.md },
  servicesGrid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  svc: {
    width: "47%",
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
  },
  svcIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  svcLabel: { fontWeight: "700", color: COLORS.onSurface },
  svcDesc: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  contactAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInitial: { color: COLORS.brandPrimary, fontWeight: "800", fontSize: FONT.lg },
  contactName: { fontWeight: "700", color: COLORS.onSurface },
  contactPhone: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
  },
  addContact: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    marginTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addContactText: { color: COLORS.brandPrimary, fontWeight: "700" },
  info: {
    flexDirection: "row",
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: RADIUS.md,
  },
  infoText: { flex: 1, color: "#fff", fontSize: FONT.sm, lineHeight: 20 },
});
