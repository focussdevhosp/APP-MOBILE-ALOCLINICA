import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

type Med = { name: string; dose: string; frequency: string; duration: string };

export default function PrescriptionWriter() {
  const router = useRouter();
  const [patient] = useState("João Pedro");
  const [meds, setMeds] = useState<Med[]>([
    { name: "", dose: "", frequency: "", duration: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  const update = (idx: number, key: keyof Med, value: string) => {
    setMeds((arr) => arr.map((m, i) => (i === idx ? { ...m, [key]: value } : m)));
  };

  const addMed = () => setMeds([...meds, { name: "", dose: "", frequency: "", duration: "" }]);
  const remove = (i: number) => setMeds(meds.filter((_, idx) => idx !== i));

  if (sent) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <View style={styles.successWrap}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={56} color="#fff" />
          </View>
          <Text style={styles.successTitle}>Receita enviada!</Text>
          <Text style={styles.successDesc}>A receita foi enviada para {patient} com assinatura digital.</Text>
          <Pressable testID="ok" onPress={() => router.back()} style={styles.okBtn}>
            <Text style={styles.okText}>Concluir</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-rxw" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Nova Receita</Text>
        <View style={styles.back} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.ptCard}>
            <View style={styles.ptAvatar}>
              <Ionicons name="person" size={22} color={COLORS.brandPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.ptLabel}>Paciente</Text>
              <Text style={styles.ptName}>{patient}</Text>
            </View>
          </View>

          <Text style={styles.section}>Medicamentos</Text>
          {meds.map((m, i) => (
            <View key={i} style={styles.medCard}>
              <View style={styles.medHead}>
                <Text style={styles.medIndex}>Medicamento {i + 1}</Text>
                {meds.length > 1 && (
                  <Pressable onPress={() => remove(i)} testID={`rm-med-${i}`}>
                    <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                  </Pressable>
                )}
              </View>
              <Field label="Nome" value={m.name} onChange={(v) => update(i, "name", v)} placeholder="Ex: Losartana" testID={`med-name-${i}`} />
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Field label="Dose" value={m.dose} onChange={(v) => update(i, "dose", v)} placeholder="50mg" testID={`med-dose-${i}`} />
                </View>
                <View style={{ flex: 1 }}>
                  <Field label="Duração" value={m.duration} onChange={(v) => update(i, "duration", v)} placeholder="30 dias" testID={`med-dur-${i}`} />
                </View>
              </View>
              <Field label="Posologia" value={m.frequency} onChange={(v) => update(i, "frequency", v)} placeholder="1x ao dia após almoço" testID={`med-freq-${i}`} />
            </View>
          ))}

          <Pressable onPress={addMed} style={styles.addBtn} testID="add-med">
            <Ionicons name="add-circle" size={22} color={COLORS.brandPrimary} />
            <Text style={styles.addText}>Adicionar medicamento</Text>
          </Pressable>

          <Text style={styles.section}>Orientações adicionais</Text>
          <TextInput
            testID="orient"
            value={notes}
            onChangeText={setNotes}
            placeholder="Digite orientações para o paciente..."
            placeholderTextColor={COLORS.muted}
            multiline
            style={styles.notesInput}
          />
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.stickyWrap}>
          <View style={styles.sticky}>
            <Pressable style={[styles.actionBtn, styles.saveBtn]} testID="save-draft">
              <Text style={styles.saveText}>Salvar rascunho</Text>
            </Pressable>
            <Pressable style={[styles.actionBtn, styles.sendBtn]} testID="send-rx" onPress={() => setSent(true)}>
              <Ionicons name="send" size={16} color="#fff" />
              <Text style={styles.sendText}>Assinar e enviar</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, value, onChange, placeholder, testID }: any) {
  return (
    <View style={{ marginBottom: SPACING.sm }}>
      <Text style={styles.fLabel}>{label}</Text>
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        style={styles.fInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
    backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  back: { width: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: 120 },
  ptCard: { flexDirection: "row", alignItems: "center", gap: SPACING.md, backgroundColor: COLORS.brandTertiary, borderRadius: RADIUS.md, padding: SPACING.md },
  ptAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  ptLabel: { color: COLORS.muted, fontSize: FONT.sm },
  ptName: { fontWeight: "700", fontSize: FONT.base, color: COLORS.onSurface },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.lg, marginBottom: SPACING.md },
  medCard: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, ...SHADOW.card },
  medHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.sm },
  medIndex: { fontWeight: "700", color: COLORS.brandPrimary, fontSize: FONT.sm },
  row: { flexDirection: "row", gap: SPACING.sm },
  fLabel: { fontSize: FONT.sm, color: COLORS.onSurfaceSecondary, fontWeight: "600", marginBottom: 4 },
  fInput: { backgroundColor: COLORS.surfaceSecondary, borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, height: 46, fontSize: FONT.base, color: COLORS.onSurface },
  addBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.brandPrimary, borderStyle: "dashed", backgroundColor: "#fff" },
  addText: { color: COLORS.brandPrimary, fontWeight: "700" },
  notesInput: { minHeight: 100, backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, fontSize: FONT.base, color: COLORS.onSurface, textAlignVertical: "top", ...SHADOW.card },
  stickyWrap: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: COLORS.border },
  sticky: { flexDirection: "row", gap: SPACING.sm, padding: SPACING.md },
  actionBtn: { flex: 1, flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", paddingVertical: 14, borderRadius: RADIUS.pill },
  saveBtn: { borderWidth: 1, borderColor: COLORS.border },
  saveText: { color: COLORS.onSurface, fontWeight: "700" },
  sendBtn: { backgroundColor: COLORS.brandPrimary },
  sendText: { color: "#fff", fontWeight: "700" },
  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: SPACING.xl },
  checkCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.success, alignItems: "center", justifyContent: "center", ...SHADOW.strong },
  successTitle: { fontSize: 26, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.lg },
  successDesc: { fontSize: FONT.base, color: COLORS.muted, marginTop: SPACING.sm, textAlign: "center", maxWidth: 280 },
  okBtn: { marginTop: SPACING.xl, backgroundColor: COLORS.brandPrimary, paddingHorizontal: SPACING.xxl, paddingVertical: 14, borderRadius: RADIUS.pill },
  okText: { color: "#fff", fontWeight: "700", fontSize: FONT.base },
});
