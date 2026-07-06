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
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PingoAvatar from "@/src/components/PingoAvatar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

export default function Login() {
  const { role } = useLocalSearchParams<{ role?: string }>();
  const router = useRouter();
  const [email, setEmail] = useState(role === "doctor" ? "ana@aloclinica.com" : "camila@email.com");
  const [password, setPassword] = useState("123456");
  const [show, setShow] = useState(false);

  const isDoctor = role === "doctor";

  const handleLogin = () => {
    if (isDoctor) router.replace("/(doctor)/home");
    else router.replace("/(patient)/home");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Pressable testID="btn-back" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
          </Pressable>

          <View style={styles.header}>
            <PingoAvatar size={96} />
            <Text style={styles.title}>
              {isDoctor ? "Bem-vindo(a), Doutor(a)!" : "Bem-vindo(a) de volta!"}
            </Text>
            <Text style={styles.subtitle}>
              Entre para continuar acessando a plataforma
            </Text>
          </View>

          <View style={styles.form}>
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

            <Pressable style={styles.forgot}>
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </Pressable>

            <Pressable
              testID="btn-login"
              onPress={handleLogin}
              style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
            >
              <Text style={styles.ctaText}>Entrar</Text>
            </Pressable>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>ou continue com</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.social}>
              <Pressable style={styles.socialBtn}>
                <Ionicons name="logo-google" size={22} color="#DB4437" />
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={22} color={COLORS.onSurface} />
                <Text style={styles.socialText}>Apple</Text>
              </Pressable>
            </View>

            <Pressable
              testID="link-register"
              onPress={() => router.push(`/register?role=${role || "patient"}`)}
              style={styles.registerRow}
            >
              <Text style={styles.registerText}>Não tem conta? </Text>
              <Text style={styles.registerLink}>Criar agora</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surface },
  scroll: { flexGrow: 1, padding: SPACING.xl, paddingBottom: SPACING.xxl },
  back: { alignSelf: "flex-start", padding: SPACING.xs },
  header: { alignItems: "center", marginTop: SPACING.md },
  title: {
    fontSize: FONT.xxl,
    fontWeight: "800",
    color: COLORS.onSurface,
    marginTop: SPACING.md,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FONT.base,
    color: COLORS.muted,
    marginTop: SPACING.xs,
    textAlign: "center",
  },
  form: { marginTop: SPACING.xl },
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
  textInput: { flex: 1, fontSize: FONT.lg, color: COLORS.onSurface },
  forgot: { alignSelf: "flex-end", marginTop: SPACING.sm },
  forgotText: { color: COLORS.brandPrimary, fontWeight: "600" },
  cta: {
    backgroundColor: COLORS.brandPrimary,
    borderRadius: RADIUS.md,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: COLORS.surface,
  },
  socialText: { fontWeight: "600", color: COLORS.onSurface },
  registerRow: { flexDirection: "row", justifyContent: "center", marginTop: SPACING.xl },
  registerText: { color: COLORS.muted, fontSize: FONT.base },
  registerLink: { color: COLORS.brandPrimary, fontSize: FONT.base, fontWeight: "700" },
});
