import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENT_ME } from "@/src/mockData";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState(PATIENT_ME.name);
  const [email, setEmail] = useState(PATIENT_ME.email);
  const [phone, setPhone] = useState(PATIENT_ME.phone);
  const [birth, setBirth] = useState(PATIENT_ME.birthdate);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => router.back(), 900);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-edit" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Editar perfil</Text>
        <View style={styles.back} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Animated.View entering={FadeInUp} style={styles.avatarWrap}>
            <View>
              <Image source={{ uri: PATIENT_ME.photo }} style={styles.avatar} />
              <Pressable style={styles.camera} testID="btn-camera">
                <Ionicons name="camera" size={16} color="#fff" />
              </Pressable>
            </View>
            <Text style={styles.avatarHint}>Toque para alterar foto</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(100)}>
            <Field label="Nome completo" value={name} onChange={setName} icon="person-outline" testID="f-name" />
            <Field label="E-mail" value={email} onChange={setEmail} icon="mail-outline" testID="f-email" />
            <Field label="Telefone" value={phone} onChange={setPhone} icon="call-outline" testID="f-phone" />
            <Field label="Data de nascimento" value={birth} onChange={setBirth} icon="calendar-outline" testID="f-birth" />
            <Field label="CPF" value={PATIENT_ME.cpf} onChange={() => {}} icon="card-outline" disabled testID="f-cpf" />
          </Animated.View>

          <Pressable testID="save-profile" onPress={save} style={[styles.saveBtn, saved && { backgroundColor: COLORS.success }]}>
            <Ionicons name={saved ? "checkmark" : "save"} size={20} color="#fff" />
            <Text style={styles.saveText}>{saved ? "Salvo!" : "Salvar alterações"}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, value, onChange, icon, disabled, testID }: any) {
  return (
    <View style={{ marginBottom: SPACING.md }}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.input, disabled && { opacity: 0.6 }]}>
        <Ionicons name={icon} size={20} color={COLORS.muted} />
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChange}
          editable={!disabled}
          style={styles.textInput}
          placeholderTextColor={COLORS.muted}
        />
        {disabled && <Ionicons name="lock-closed" size={16} color={COLORS.muted} />}
      </View>
    </View>
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
  avatarWrap: { alignItems: "center", marginBottom: SPACING.xl },
  avatar: { width: 96, height: 96, borderRadius: 48, borderWidth: 3, borderColor: COLORS.brandTertiary },
  camera: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  avatarHint: { color: COLORS.muted, marginTop: SPACING.sm, fontSize: FONT.sm },
  label: { fontSize: FONT.sm, fontWeight: "600", color: COLORS.onSurfaceSecondary, marginBottom: SPACING.xs },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 52,
    backgroundColor: "#fff",
  },
  textInput: { flex: 1, fontSize: FONT.base, color: COLORS.onSurface },
  saveBtn: {
    flexDirection: "row",
    gap: SPACING.sm,
    height: 54,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.md,
    ...SHADOW.card,
  },
  saveText: { color: "#fff", fontWeight: "800", fontSize: FONT.lg },
});
