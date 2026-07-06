import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeInDown,
  FadeIn,
  ZoomIn,
} from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const { width } = Dimensions.get("window");

export default function Login() {
  const { role } = useLocalSearchParams<{ role?: string }>();
  const router = useRouter();
  const isDoctor = role === "doctor";
  const [email, setEmail] = useState(isDoctor ? "ana@aloclinica.com" : "camila@email.com");
  const [password, setPassword] = useState("123456");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isDoctor) router.replace("/(doctor)/home");
      else router.replace("/(patient)/home");
    }, 600);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Hero */}
      <LinearGradient
        colors={
          isDoctor ? ["#FF9500", "#FF6B00", "#E5570A"] : [COLORS.brandPrimary, "#0056B3", "#003D80"]
        }
        style={styles.hero}
      >
        <SafeAreaView edges={["top"]}>
          <Pressable testID="btn-back" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <View style={styles.heroInner}>
            <Animated.View entering={ZoomIn.duration(600).springify()}>
              <AnimatedPingo variant={isDoctor ? "clipboard" : "waving"} size={160} animate="alive" />
            </Animated.View>
            <Animated.Text entering={FadeIn.delay(200)} style={styles.hi}>
              {isDoctor ? "Bem-vindo(a),\nDoutor(a)! 👋" : "Que bom te ver\npor aqui! 👋"}
            </Animated.Text>
            <Animated.Text entering={FadeIn.delay(400)} style={styles.hiSub}>
              {isDoctor
                ? "Acesse sua agenda e pacientes"
                : "Entre para cuidar da sua saúde"}
            </Animated.Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Form card */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.card}>
            <Text style={styles.formTitle}>Entrar na conta</Text>

            <Text style={styles.label}>E-mail</Text>
            <View style={styles.input}>
              <Ionicons name="mail-outline" size={20} color={COLORS.muted} />
              <TextInput
                testID="input-email"
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor={COLORS.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>

            <Text style={[styles.label, { marginTop: SPACING.md }]}>Senha</Text>
            <View style={styles.input}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.muted} />
              <TextInput
                testID="input-password"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={COLORS.muted}
                secureTextEntry={!show}
                style={styles.textInput}
              />
              <Pressable onPress={() => setShow(!show)}>
                <Ionicons name={show ? "eye-off" : "eye"} size={20} color={COLORS.muted} />
              </Pressable>
            </View>

            <View style={styles.rowBetween}>
              <Pressable style={styles.remember}>
                <View style={styles.checkbox}>
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
                <Text style={styles.rememberText}>Lembrar de mim</Text>
              </Pressable>
              <Pressable>
                <Text style={styles.forgot}>Esqueci a senha</Text>
              </Pressable>
            </View>

            <Pressable
              testID="btn-login"
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                styles.cta,
                { backgroundColor: isDoctor ? COLORS.brandSecondary : COLORS.brandPrimary },
                pressed && { opacity: 0.9 },
              ]}
            >
              {loading ? (
                <Text style={styles.ctaText}>Entrando...</Text>
              ) : (
                <>
                  <Text style={styles.ctaText}>Entrar</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </>
              )}
            </Pressable>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>ou continue com</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.social}>
              <Pressable testID="btn-google" style={styles.socialBtn}>
                <Ionicons name="logo-google" size={22} color="#DB4437" />
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable testID="btn-apple" style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={22} color={COLORS.onSurface} />
                <Text style={styles.socialText}>Apple</Text>
              </Pressable>
            </View>
          </Animated.View>

          <Pressable
            testID="link-register"
            onPress={() => router.push(`/register?role=${role || "patient"}`)}
            style={styles.registerRow}
          >
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <Text style={[styles.registerLink, { color: isDoctor ? COLORS.brandSecondary : COLORS.brandPrimary }]}>
              Criar agora
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  hero: {
    paddingBottom: 100,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  back: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroInner: { alignItems: "center", paddingHorizontal: SPACING.xl, paddingTop: SPACING.md },
  hi: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: SPACING.sm,
    lineHeight: 34,
  },
  hiSub: {
    color: "rgba(255,255,255,0.9)",
    fontSize: FONT.base,
    textAlign: "center",
    marginTop: SPACING.xs,
  },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl },
  card: {
    marginTop: -70,
    backgroundColor: "#fff",
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOW.strong,
  },
  formTitle: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface, marginBottom: SPACING.lg },
  label: {
    fontSize: FONT.sm,
    fontWeight: "600",
    color: COLORS.onSurfaceSecondary,
    marginBottom: SPACING.xs,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 52,
    backgroundColor: COLORS.surfaceSecondary,
  },
  textInput: { flex: 1, fontSize: FONT.base, color: COLORS.onSurface },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.md,
  },
  remember: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  rememberText: { color: COLORS.onSurfaceSecondary, fontSize: FONT.sm },
  forgot: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  cta: {
    flexDirection: "row",
    gap: SPACING.sm,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.pill,
    marginTop: SPACING.lg,
    ...SHADOW.card,
  },
  ctaText: { color: "#fff", fontSize: FONT.lg, fontWeight: "700" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginVertical: SPACING.lg,
  },
  line: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.muted, fontSize: FONT.sm },
  social: { flexDirection: "row", gap: SPACING.md },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  socialText: { fontWeight: "600", color: COLORS.onSurface },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
  },
  registerText: { color: COLORS.muted, fontSize: FONT.base },
  registerLink: { fontSize: FONT.base, fontWeight: "700" },
});
