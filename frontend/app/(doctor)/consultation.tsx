import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENTS, DOCTOR_ME } from "@/src/mockData";

export default function DoctorConsultation() {
  const router = useRouter();
  const patient = PATIENTS[1];
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={{ uri: patient.photo }} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent", "transparent", "rgba(0,0,0,0.6)"]} style={StyleSheet.absoluteFill} />

      <SafeAreaView edges={["top"]} style={styles.topWrap}>
        <View style={styles.topRow}>
          <Pressable onPress={() => router.back()} style={styles.topBtn}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.callInfo}>
            <View style={styles.recDot} />
            <Text style={styles.callText}>{patient.name}</Text>
            <Text style={styles.callTime}>· {fmt(seconds)}</Text>
          </View>
          <Pressable onPress={() => setNotesOpen(!notesOpen)} style={styles.topBtn}>
            <Ionicons name="document-text" size={22} color="#fff" />
          </Pressable>
        </View>

        {!camOff && (
          <View style={styles.pip}>
            <Image source={{ uri: DOCTOR_ME.photo }} style={styles.pipImg} contentFit="cover" />
          </View>
        )}
      </SafeAreaView>

      {notesOpen && (
        <View style={styles.notesPanel}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>Anotações da consulta</Text>
            <Pressable onPress={() => setNotesOpen(false)}>
              <Ionicons name="close" size={22} color={COLORS.onSurface} />
            </Pressable>
          </View>
          <TextInput
            testID="notes-input"
            value={notes}
            onChangeText={setNotes}
            placeholder="Registre observações, queixas e diagnóstico..."
            placeholderTextColor={COLORS.muted}
            multiline
            style={styles.notesInput}
          />
          <Pressable
            testID="write-rx"
            onPress={() => router.push("/(doctor)/prescription-writer")}
            style={styles.rxCta}
          >
            <Ionicons name="document-text" size={18} color="#fff" />
            <Text style={styles.rxCtaText}>Prescrever medicamento</Text>
          </Pressable>
        </View>
      )}

      <SafeAreaView edges={["bottom"]} style={styles.bottomWrap}>
        <View style={styles.controls}>
          <Ctrl icon={muted ? "mic-off" : "mic"} active={muted} onPress={() => setMuted(!muted)} testID="d-mic" />
          <Ctrl icon={camOff ? "videocam-off" : "videocam"} active={camOff} onPress={() => setCamOff(!camOff)} testID="d-cam" />
          <Ctrl icon="document-text" onPress={() => setNotesOpen(true)} testID="d-notes" />
          <Ctrl icon="share-social" onPress={() => {}} testID="d-share" />
          <Pressable testID="d-end" onPress={() => router.back()} style={styles.endBtn}>
            <Ionicons name="call" size={26} color="#fff" style={{ transform: [{ rotate: "135deg" }] }} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

function Ctrl({ icon, active, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={[styles.ctrl, active && { backgroundColor: "#fff" }]}>
      <Ionicons name={icon} size={22} color={active ? COLORS.onSurface : "#fff"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  topWrap: { position: "absolute", top: 0, left: 0, right: 0 },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: SPACING.lg },
  topBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  callInfo: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(0,0,0,0.5)", paddingHorizontal: SPACING.md, paddingVertical: 8, borderRadius: RADIUS.pill },
  recDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  callText: { color: "#fff", fontWeight: "700" },
  callTime: { color: "rgba(255,255,255,0.85)" },
  pip: { position: "absolute", right: SPACING.lg, top: 80, width: 100, height: 140, borderRadius: RADIUS.md, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.4)" },
  pipImg: { width: "100%", height: "100%" },
  notesPanel: { position: "absolute", bottom: 120, left: SPACING.lg, right: SPACING.lg, backgroundColor: "#fff", borderRadius: RADIUS.lg, padding: SPACING.md, ...SHADOW.strong },
  notesHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.md },
  notesTitle: { fontWeight: "700", fontSize: FONT.base, color: COLORS.onSurface },
  notesInput: { minHeight: 100, backgroundColor: COLORS.surfaceSecondary, borderRadius: RADIUS.md, padding: SPACING.md, fontSize: FONT.base, textAlignVertical: "top" },
  rxCta: { flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.brandPrimary, paddingVertical: 12, borderRadius: RADIUS.pill, marginTop: SPACING.md },
  rxCtaText: { color: "#fff", fontWeight: "700" },
  bottomWrap: { position: "absolute", bottom: 0, left: 0, right: 0 },
  controls: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: SPACING.sm, backgroundColor: "rgba(20,20,25,0.85)", marginHorizontal: SPACING.lg, marginBottom: SPACING.md, padding: SPACING.md, borderRadius: RADIUS.pill },
  ctrl: { width: 52, height: 52, borderRadius: 26, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" },
  endBtn: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.error, alignItems: "center", justifyContent: "center" },
});
