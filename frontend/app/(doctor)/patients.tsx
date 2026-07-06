import { useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PATIENTS } from "@/src/mockData";

export default function DoctorPatients() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const list = useMemo(() => PATIENTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Pacientes</Text>
        <Text style={styles.subtitle}>{PATIENTS.length} pacientes cadastrados</Text>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={20} color={COLORS.muted} />
        <TextInput
          testID="search-pt"
          value={q}
          onChangeText={setQ}
          placeholder="Buscar por nome"
          placeholderTextColor={COLORS.muted}
          style={styles.textInput}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {list.map((p) => (
          <Pressable
            key={p.id}
            testID={`pt-${p.id}`}
            onPress={() => router.push(`/(doctor)/patient/${p.id}`)}
            style={styles.card}
          >
            <Image source={{ uri: p.photo }} style={styles.photo} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.meta}>{p.age} anos · {p.gender}</Text>
              <View style={styles.condRow}>
                <Ionicons name="pulse" size={13} color={COLORS.brandPrimary} />
                <Text style={styles.cond}>{p.condition}</Text>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.lastLabel}>Última visita</Text>
              <Text style={styles.lastDate}>{p.lastVisit}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  title: { fontSize: FONT.xxl, fontWeight: "800", color: COLORS.onSurface },
  subtitle: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  search: {
    flexDirection: "row", alignItems: "center", gap: SPACING.sm,
    marginHorizontal: SPACING.lg, marginTop: SPACING.md,
    paddingHorizontal: SPACING.md, height: 46,
    borderRadius: RADIUS.md, backgroundColor: "#fff", ...SHADOW.card,
  },
  textInput: { flex: 1, fontSize: FONT.base, color: COLORS.onSurface },
  list: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  card: {
    flexDirection: "row", alignItems: "center", gap: SPACING.md,
    backgroundColor: "#fff", borderRadius: RADIUS.md, padding: SPACING.md,
    marginBottom: SPACING.sm, ...SHADOW.card,
  },
  photo: { width: 52, height: 52, borderRadius: 26 },
  name: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  meta: { color: COLORS.muted, fontSize: FONT.sm, marginTop: 2 },
  condRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  cond: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  lastLabel: { fontSize: 11, color: COLORS.muted },
  lastDate: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.sm },
});
