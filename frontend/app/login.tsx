import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

export default function Login() {
  const { role } = useLocalSearchParams<{ role?: string }>();
  const router = useRouter();
  const isDoctor = role === "doctor";
  const [email, setEmail] = useState(isDoctor ? "ana@aloclinica.com" : "camila@email.com");
  const [password, setPassword] = useState("123456");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const primary = isDoctor ? COLORS.brandSecondary : COLORS.brandPrimary;

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isDoctor) router.replace("/(doctor)/home");
      else router.replace("/(patient)/home");
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Compact header */}
          <View style={styles.headerRow}>
            <Pressable testID="btn-back" onPress={() => router.back()} style={styles.back}>
              <Ionicons name="chevron-back" size={24} color={COLORS.onSurface} />
            </Pressable>
            <Text style={styles.stepText}>Entrar</Text>
            <View style={styles.back} />
          </View>

          {/* Small Pingo greeting card */}
          <Animated.View entering={ZoomIn.duration(500).springify()} style={styles.greetCard}>
            <LinearGradient
              colors={
                isDoctor
                  ? ["#FF9500", "#FF6B00"]
                  : [COLORS.brandPrimary, COLORS.brandDark]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.greetGradient}
            >
              <View style={styles.greetText}>
                <Text style={styles.hi}>
                  {isDoctor ? "Olá, Doutor(a)!" : "Olá!"}
                </Text>
                <Text style={styles.hiSub}>
                  {isDoctor ? "Sua agenda te espera 💙" : "Vamos cuidar da sua saúde 💙"}
                </Text>
              </View>
              <View style={styles.pingoBox}>
                <AnimatedPingo
                  variant={isDoctor ? "clipboard" : "waving"}
                  size={90}
                  animate="alive"
                />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInUp.delay(150)} style={styles.form}>
            <Text style={styles.formTitle}>Entrar na conta</Text>
            <Text style={styles.formDesc}>Preencha seus dados abaixo</Text>

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
                <View style={[styles.checkbox, { backgroundColor: primary }]}>
                  <Ionicons name="checkmark" size={12} color="#fff" />
                </View>
                <Text style={styles.rememberText}>Lembrar de mim</Text>
              </Pressable>
              <Pressable>
                <Text style={[styles.forgot, { color: primary }]}>Esqueci a senha</Text>
              </Pressable>
            </View>

            <Pressable
              testID="btn-login"
              onPress={handleLogin}
              disabled={loading}
              style={({ pressed }) => [
                styles.cta,
                { backgroundColor: primary },
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
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable testID="btn-apple" style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={20} color={COLORS.onSurface} />
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
            <Text style={[styles.registerLink, { color: primary }]}>Criar agora</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surface },
  scroll: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, flexGrow: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  greetCard: {
    marginTop: SPACING.sm,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    ...SHADOW.card,
  },
  greetGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    paddingRight: 0,
    minHeight: 110,
  },
  greetText: { flex: 1, paddingRight: SPACING.sm },
  hi: { color: "#fff", fontSize: 22, fontWeight: "800" },
  hiSub: { color: "rgba(255,255,255,0.9)", fontSize: FONT.sm, marginTop: 4 },
  pingoBox: { width: 100, alignItems: "center", justifyContent: "center" },
  form: {
    marginTop: SPACING.lg,
  },
  formTitle: {
    fontSize: FONT.xl,
    fontWeight: "800",
    color: COLORS.onSurface,
  },
  formDesc: { color: COLORS.muted, marginTop: 4, marginBottom: SPACING.md, fontSize: FONT.sm },
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
    alignItems: "center",
    justifyContent: "center",
  },
  rememberText: { color: COLORS.onSurfaceSecondary, fontSize: FONT.sm },
  forgot: { fontWeight: "600", fontSize: FONT.sm },
  cta: {
    flexDirection: "row",
    gap: SPACING.sm,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.pill,
    marginTop: SPACING.lg,
  },
  ctaText: { color: "#fff", fontSize: FONT.lg, fontWeight: "700" },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginVertical: SPACING.md,
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
    height: 46,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  socialText: { fontWeight: "600", color: COLORS.onSurface },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.lg,
  },
  registerText: { color: COLORS.muted, fontSize: FONT.base },
  registerLink: { fontSize: FONT.base, fontWeight: "700" },
});
