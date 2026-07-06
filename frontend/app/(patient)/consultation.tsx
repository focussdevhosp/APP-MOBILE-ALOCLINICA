import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTORS, PATIENT_ME } from "@/src/mockData";

export default function Consultation() {
  const router = useRouter();
  const doctor = DOCTORS[0];
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
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
      {/* Full-screen doctor "video" */}
      <Image source={{ uri: doctor.photo }} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent", "transparent", "rgba(0,0,0,0.6)"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top overlay */}
      <SafeAreaView edges={["top"]} style={styles.topWrap}>
        <View style={styles.topRow}>
          <View style={styles.callInfo}>
            <View style={styles.recDot} />
            <Text style={styles.callText}>{doctor.name.split(" ").slice(-1)[0]}</Text>
            <Text style={styles.callTime}>· {fmt(seconds)}</Text>
          </View>
          <Pressable style={styles.topBtn}>
            <Ionicons name="swap-horizontal" size={22} color="#fff" />
          </Pressable>
        </View>

        {/* PIP self view */}
        {!camOff && (
          <View style={styles.pip}>
            <Image source={{ uri: PATIENT_ME.photo }} style={styles.pipImg} contentFit="cover" />
          </View>
        )}
        {camOff && (
          <View style={[styles.pip, { backgroundColor: "#222", alignItems: "center", justifyContent: "center" }]}>
            <Ionicons name="videocam-off" size={22} color="#fff" />
          </View>
        )}
      </SafeAreaView>

      {/* Bottom Controls */}
      <SafeAreaView edges={["bottom"]} style={styles.bottomWrap}>
        <View style={styles.controls}>
          <ControlBtn
            icon={muted ? "mic-off" : "mic"}
            active={muted}
            onPress={() => setMuted(!muted)}
            testID="ctrl-mic"
          />
          <ControlBtn
            icon={camOff ? "videocam-off" : "videocam"}
            active={camOff}
            onPress={() => setCamOff(!camOff)}
            testID="ctrl-cam"
          />
          <ControlBtn icon="chatbubble" onPress={() => {}} testID="ctrl-chat" />
          <ControlBtn icon="ellipsis-horizontal" onPress={() => {}} testID="ctrl-more" />
          <Pressable
            testID="end-call"
            onPress={() => router.back()}
            style={styles.endBtn}
          >
            <Ionicons name="call" size={28} color="#fff" style={{ transform: [{ rotate: "135deg" }] }} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

function ControlBtn({ icon, active, onPress, testID }: any) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[styles.ctrlBtn, active && { backgroundColor: "#fff" }]}
    >
      <Ionicons name={icon} size={24} color={active ? COLORS.onSurface : "#fff"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  topWrap: { position: "absolute", top: 0, left: 0, right: 0 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.lg,
  },
  callInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  recDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  callText: { color: "#fff", fontWeight: "700" },
  callTime: { color: "rgba(255,255,255,0.85)" },
  topBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  pip: {
    position: "absolute",
    right: SPACING.lg,
    top: 80,
    width: 100,
    height: 140,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    ...SHADOW.strong,
  },
  pipImg: { width: "100%", height: "100%" },
  bottomWrap: { position: "absolute", bottom: 0, left: 0, right: 0 },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "rgba(20,20,25,0.85)",
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.pill,
  },
  ctrlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  endBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.error,
    alignItems: "center",
    justifyContent: "center",
  },
});
