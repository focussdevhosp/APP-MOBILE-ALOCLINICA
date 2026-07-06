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
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

export default function Register() {
  const { role } = useLocalSearchParams<{ role?: string }>();
  const router = useRouter();
  const isDoctor = role === "doctor";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doc, setDoc] = useState("");

  const handleRegister = () => {
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
          <Pressable testID="btn-back-reg" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
          </Pressable>

          <View style={styles.header}>
            <Text style={styles.title}>Criar sua conta</Text>
            <Text style={styles.subtitle}>
              {isDoctor
                ? "Cadastro para profissionais de saúde"
                : "Comece a cuidar da sua saúde agora mesmo"}
            </Text>
          </View>

          <View style={styles.form}>
            <Field
              label="Nome completo"
              icon="person-outline"
              value={name}
              onChange={setName}
              placeholder="Seu nome"
              testID="input-name"
            />
            <Field
              label="E-mail"
              icon="mail-outline"
              value={email}
              onChange={setEmail}
              placeholder="seu@email.com"
              testID="input-email-reg"
            />
            <Field
              label={isDoctor ? "CRM" : "CPF"}
              icon={isDoctor ? "medkit-outline" : "card-outline"}
              value={doc}
              onChange={setDoc}
              placeholder={isDoctor ? "CRM/UF 000000" : "000.000.000-00"}
              testID="input-doc"
            />
            <Field
              label="Senha"
              icon="lock-closed-outline"
              value={password}
              onChange={setPassword}
              placeholder="Crie sua senha"
              secure
              testID="input-password-reg"
            />

            <Text style={styles.terms}>
              Ao criar sua conta você concorda com nossos{" "}
              <Text style={{ color: COLORS.brandPrimary, fontWeight: "600" }}>Termos</Text> e{" "}
              <Text style={{ color: COLORS.brandPrimary, fontWeight: "600" }}>Política de Privacidade</Text>.
            </Text>

            <Pressable
              testID="btn-register"
              onPress={handleRegister}
              style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
            >
              <Text style={styles.ctaText}>Criar conta</Text>
            </Pressable>

            <Pressable
              testID="link-login"
              onPress={() => router.replace(`/login?role=${role || "patient"}`)}
              style={styles.registerRow}
            >
              <Text style={styles.registerText}>Já tem conta? </Text>
              <Text style={styles.registerLink}>Entrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type FieldProps = {
  label: string;
  icon: any;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  secure?: boolean;
  testID?: string;
};

function Field({ label, icon, value, onChange, placeholder, secure, testID }: FieldProps) {
  return (
    <View style={{ marginBottom: SPACING.md }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Ionicons name={icon} size={20} color={COLORS.muted} />
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          secureTextEntry={secure}
          autoCapitalize="none"
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surface },
  scroll: { flexGrow: 1, padding: SPACING.xl, paddingBottom: SPACING.xxl },
  back: { alignSelf: "flex-start", padding: SPACING.xs },
  header: { marginTop: SPACING.md, marginBottom: SPACING.lg },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface },
  subtitle: { fontSize: FONT.base, color: COLORS.muted, marginTop: SPACING.xs },
  form: {},
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
  terms: { fontSize: FONT.sm, color: COLORS.muted, marginTop: SPACING.md, lineHeight: 18 },
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
  registerRow: { flexDirection: "row", justifyContent: "center", marginTop: SPACING.xl },
  registerText: { color: COLORS.muted, fontSize: FONT.base },
  registerLink: { color: COLORS.brandPrimary, fontSize: FONT.base, fontWeight: "700" },
});
