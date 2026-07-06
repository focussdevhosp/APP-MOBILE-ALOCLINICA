import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInUp, ZoomIn } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

type Method = "credit" | "pix" | "wallet";

export default function Payment() {
  const router = useRouter();
  const [method, setMethod] = useState<Method>("credit");
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);

  const pay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
    }, 1500);
  };

  if (paid) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <View style={styles.successWrap}>
          <Animated.View entering={ZoomIn.duration(500).springify()}>
            <AnimatedPingo variant="celebrating" size={200} animate="alive" />
          </Animated.View>
          <Animated.Text entering={FadeIn.delay(300)} style={styles.successTitle}>
            Pagamento aprovado!
          </Animated.Text>
          <Animated.Text entering={FadeIn.delay(500)} style={styles.successDesc}>
            Sua consulta foi confirmada. Você receberá um lembrete 15min antes.
          </Animated.Text>
          <Animated.View entering={FadeInUp.delay(700)} style={{ width: "100%" }}>
            <Pressable
              testID="pay-ok"
              onPress={() => router.replace("/(patient)/appointments")}
              style={styles.okBtn}
            >
              <Text style={styles.okText}>Ver minhas consultas</Text>
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-pay" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Pagamento</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.summary}>
          <Text style={styles.sumLabel}>Total a pagar</Text>
          <Text style={styles.sumValue}>R$ 180,00</Text>
          <Text style={styles.sumSpec}>Videoconsulta • Cardiologia</Text>
        </Animated.View>

        <Text style={styles.section}>Forma de pagamento</Text>
        <Animated.View entering={FadeInUp.delay(200)}>
          <MethodCard
            selected={method === "credit"}
            onPress={() => setMethod("credit")}
            icon="card"
            title="Cartão de crédito"
            desc="•••• 4291"
            testID="m-credit"
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(280)}>
          <MethodCard
            selected={method === "pix"}
            onPress={() => setMethod("pix")}
            icon="qr-code"
            title="Pix"
            desc="Aprovação instantânea"
            badge="RECOMENDADO"
            testID="m-pix"
          />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(360)}>
          <MethodCard
            selected={method === "wallet"}
            onPress={() => setMethod("wallet")}
            icon="wallet"
            title="Carteira Alô Clínica"
            desc="Saldo: R$ 78,00"
            disabled
            testID="m-wallet"
          />
        </Animated.View>

        {method === "credit" && (
          <Animated.View entering={FadeIn} style={styles.card}>
            <Text style={styles.label}>Nome no cartão</Text>
            <TextInput placeholder="Como está no cartão" placeholderTextColor={COLORS.muted} style={styles.input} />
            <Text style={[styles.label, { marginTop: SPACING.md }]}>Número do cartão</Text>
            <TextInput
              placeholder="0000 0000 0000 0000"
              placeholderTextColor={COLORS.muted}
              keyboardType="number-pad"
              style={styles.input}
            />
            <View style={{ flexDirection: "row", gap: SPACING.sm, marginTop: SPACING.md }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Validade</Text>
                <TextInput placeholder="MM/AA" placeholderTextColor={COLORS.muted} style={styles.input} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>CVV</Text>
                <TextInput placeholder="123" placeholderTextColor={COLORS.muted} secureTextEntry style={styles.input} />
              </View>
            </View>
          </Animated.View>
        )}

        {method === "pix" && (
          <Animated.View entering={FadeIn} style={[styles.card, { alignItems: "center" }]}>
            <View style={styles.qr}>
              <Ionicons name="qr-code" size={80} color={COLORS.onSurface} />
            </View>
            <Text style={styles.pixTxt}>Escaneie o QR Code com seu banco</Text>
            <Text style={styles.pixHint}>Ou toque em Pagar agora para copiar o código</Text>
          </Animated.View>
        )}

        <View style={styles.secure}>
          <Ionicons name="lock-closed" size={14} color={COLORS.success} />
          <Text style={styles.secureText}>Pagamento seguro criptografado</Text>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.stickyWrap}>
        <Pressable
          testID="pay-now"
          onPress={pay}
          disabled={processing}
          style={[styles.payBtn, processing && { opacity: 0.6 }]}
        >
          {processing ? (
            <Text style={styles.payText}>Processando...</Text>
          ) : (
            <>
              <Ionicons name="lock-closed" size={18} color="#fff" />
              <Text style={styles.payText}>Pagar R$ 180,00</Text>
            </>
          )}
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
}

function MethodCard({ icon, title, desc, selected, onPress, badge, disabled, testID }: any) {
  return (
    <Pressable
      testID={testID}
      onPress={disabled ? undefined : onPress}
      style={[styles.methodCard, selected && styles.methodCardSel, disabled && { opacity: 0.5 }]}
    >
      <View style={[styles.methodIcon, selected && { backgroundColor: COLORS.brandTertiary }]}>
        <Ionicons name={icon} size={22} color={selected ? COLORS.brandPrimary : COLORS.muted} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.sm }}>
          <Text style={styles.methodTitle}>{title}</Text>
          {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
        </View>
        <Text style={styles.methodDesc}>{desc}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioActive]}>
        {selected && <View style={styles.radioInner} />}
      </View>
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
  scroll: { padding: SPACING.lg, paddingBottom: 120 },
  summary: {
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    alignItems: "center",
    marginBottom: SPACING.lg,
    ...SHADOW.card,
  },
  sumLabel: { color: COLORS.muted, fontSize: FONT.sm, fontWeight: "600" },
  sumValue: { fontSize: 36, fontWeight: "800", color: COLORS.brandPrimary, marginTop: 4 },
  sumSpec: { color: COLORS.muted, marginTop: 4 },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginBottom: SPACING.md },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: "transparent",
    ...SHADOW.card,
  },
  methodCardSel: { borderColor: COLORS.brandPrimary },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  methodTitle: { fontWeight: "700", color: COLORS.onSurface },
  methodDesc: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  badge: { backgroundColor: "#E1F8E7", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { color: COLORS.success, fontSize: 10, fontWeight: "700" },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.borderStrong },
  radioActive: { borderColor: COLORS.brandPrimary },
  radioInner: { flex: 1, margin: 3, borderRadius: 11, backgroundColor: COLORS.brandPrimary },
  card: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.sm, ...SHADOW.card },
  label: { fontSize: FONT.sm, color: COLORS.onSurfaceSecondary, fontWeight: "600", marginBottom: 4 },
  input: {
    height: 46,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    fontSize: FONT.base,
  },
  qr: {
    width: 180,
    height: 180,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SPACING.md,
  },
  pixTxt: { fontWeight: "700", color: COLORS.onSurface, textAlign: "center" },
  pixHint: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 4, textAlign: "center" },
  secure: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: SPACING.lg,
  },
  secureText: { color: COLORS.muted, fontSize: FONT.sm },
  stickyWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SPACING.md,
  },
  payBtn: {
    flexDirection: "row",
    gap: SPACING.sm,
    height: 54,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.card,
  },
  payText: { color: "#fff", fontWeight: "800", fontSize: FONT.lg },
  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: SPACING.xl },
  successTitle: { fontSize: 28, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.lg },
  successDesc: {
    fontSize: FONT.base,
    color: COLORS.muted,
    marginTop: SPACING.sm,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
  },
  okBtn: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: 16,
    borderRadius: RADIUS.pill,
    alignItems: "center",
  },
  okText: { color: "#fff", fontWeight: "800", fontSize: FONT.lg },
});
