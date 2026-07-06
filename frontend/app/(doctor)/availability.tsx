import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const DAYS = [
  { key: "seg", label: "Segunda" },
  { key: "ter", label: "Terça" },
  { key: "qua", label: "Quarta" },
  { key: "qui", label: "Quinta" },
  { key: "sex", label: "Sexta" },
  { key: "sab", label: "Sábado" },
  { key: "dom", label: "Domingo" },
];

const SLOTS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export default function Availability() {
  const router = useRouter();
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    seg: true, ter: true, qua: true, qui: true, sex: true, sab: false, dom: false,
  });
  const [selected, setSelected] = useState("seg");
  const [slots, setSlots] = useState<string[]>(SLOTS);
  const [duration, setDuration] = useState(30);

  const toggleSlot = (s: string) => {
    setSlots((arr) => (arr.includes(s) ? arr.filter((x) => x !== s) : [...arr, s]));
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-av" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Disponibilidade</Text>
        <Pressable style={styles.back}>
          <Ionicons name="checkmark" size={26} color={COLORS.brandPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp} style={styles.card}>
          <Text style={styles.section}>Duração da consulta</Text>
          <View style={styles.durations}>
            {[15, 30, 45, 60].map((d) => (
              <Pressable
                key={d}
                testID={`d-${d}`}
                onPress={() => setDuration(d)}
                style={[styles.durBtn, duration === d && styles.durActive]}
              >
                <Text style={[styles.durText, duration === d && { color: "#fff" }]}>{d}min</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100)} style={styles.card}>
          <Text style={styles.section}>Dias de atendimento</Text>
          {DAYS.map((d) => (
            <View key={d.key} style={styles.dayRow}>
              <Text style={[styles.dayLabel, !enabled[d.key] && { color: COLORS.muted }]}>{d.label}</Text>
              <Switch
                testID={`sw-${d.key}`}
                value={enabled[d.key]}
                onValueChange={(v) => setEnabled((e) => ({ ...e, [d.key]: v }))}
                trackColor={{ false: COLORS.border, true: COLORS.brandPrimary }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.card}>
          <Text style={styles.section}>Horários disponíveis</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayPicker}>
            {DAYS.filter((d) => enabled[d.key]).map((d) => (
              <Pressable
                key={d.key}
                testID={`sel-${d.key}`}
                onPress={() => setSelected(d.key)}
                style={[styles.dayChip, selected === d.key && styles.dayChipActive]}
              >
                <Text style={[styles.dayChipText, selected === d.key && { color: "#fff" }]}>{d.label.slice(0, 3)}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.slotsGrid}>
            {SLOTS.map((s) => (
              <Pressable
                key={s}
                testID={`slot-${s}`}
                onPress={() => toggleSlot(s)}
                style={[styles.slot, slots.includes(s) && styles.slotActive]}
              >
                <Text style={[styles.slotText, slots.includes(s) && { color: "#fff" }]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <View style={styles.info}>
          <Ionicons name="information-circle" size={20} color={COLORS.brandPrimary} />
          <Text style={styles.infoText}>
            Alterações entram em vigor a partir do próximo período de agendamento.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: COLORS.border },
  back: { width: 40, alignItems: "center" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  card: { backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOW.card },
  section: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface, marginBottom: SPACING.md },
  durations: { flexDirection: "row", gap: SPACING.sm },
  durBtn: { flex: 1, paddingVertical: 10, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, alignItems: "center" },
  durActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  durText: { fontWeight: "700", color: COLORS.onSurface },
  dayRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  dayLabel: { fontWeight: "600", color: COLORS.onSurface, fontSize: FONT.base },
  dayPicker: { gap: SPACING.sm, marginBottom: SPACING.md },
  dayChip: { paddingHorizontal: SPACING.md, paddingVertical: 8, borderRadius: RADIUS.pill, borderWidth: 1, borderColor: COLORS.border, flexShrink: 0 },
  dayChipActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  dayChipText: { fontWeight: "600", color: COLORS.onSurface, fontSize: FONT.sm },
  slotsGrid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  slot: { width: "22%", paddingVertical: 10, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, alignItems: "center" },
  slotActive: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  slotText: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.sm },
  info: { flexDirection: "row", gap: SPACING.sm, alignItems: "flex-start", padding: SPACING.md, backgroundColor: COLORS.brandTertiary, borderRadius: RADIUS.md },
  infoText: { flex: 1, color: COLORS.onBrandTertiary, fontSize: FONT.sm, lineHeight: 20 },
});
