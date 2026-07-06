import { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { SPECIALTIES, DOCTORS } from "@/src/mockData";

export default function Search() {
  const params = useLocalSearchParams<{ spec?: string }>();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(params.spec || "all");

  const filtered = useMemo(() => {
    return DOCTORS.filter((d) => {
      const matchSpec = selected === "all" || d.specialtyId === selected;
      const matchQuery =
        !query || d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase());
      return matchSpec && matchQuery;
    });
  }, [query, selected]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.headerWrap}>
        <View style={styles.header}>
          <Pressable testID="back-search" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
          </Pressable>
          <Text style={styles.title}>Buscar Médicos</Text>
          <View style={styles.back} />
        </View>

        <View style={styles.search}>
          <Ionicons name="search" size={20} color={COLORS.muted} />
          <TextInput
            testID="search-input"
            value={query}
            onChangeText={setQuery}
            placeholder="Nome ou especialidade"
            placeholderTextColor={COLORS.muted}
            style={styles.textInput}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color={COLORS.muted} />
            </Pressable>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          <Chip label="Todos" active={selected === "all"} onPress={() => setSelected("all")} testID="chip-all" />
          {SPECIALTIES.map((s) => (
            <Chip
              key={s.id}
              label={s.name}
              active={selected === s.id}
              onPress={() => setSelected(s.id)}
              testID={`chip-${s.id}`}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.count}>{filtered.length} médico(s) encontrado(s)</Text>
        {filtered.map((d) => (
          <Pressable
            key={d.id}
            testID={`res-${d.id}`}
            onPress={() => router.push(`/(patient)/doctor/${d.id}`)}
            style={styles.card}
          >
            <View style={styles.photoWrap}>
              <Image source={{ uri: d.photo }} style={styles.photo} />
              {d.online && <View style={styles.online} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{d.name}</Text>
              <Text style={styles.spec}>{d.specialty}</Text>
              <View style={styles.meta}>
                <Ionicons name="star" size={14} color="#FFCC00" />
                <Text style={styles.rating}>{d.rating}</Text>
                <Text style={styles.dot}>•</Text>
                <Ionicons name="time-outline" size={13} color={COLORS.muted} />
                <Text style={styles.next}>{d.nextAvailable}</Text>
              </View>
              <Text style={styles.price}>A partir de R$ {d.price}</Text>
            </View>
          </Pressable>
        ))}
        {filtered.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="search" size={48} color={COLORS.muted} />
            <Text style={styles.emptyText}>Nenhum médico encontrado</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Chip({ label, active, onPress, testID }: any) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  headerWrap: { backgroundColor: "#fff", paddingBottom: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  back: { width: 40, alignItems: "flex-start" },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.surfaceSecondary,
    paddingHorizontal: SPACING.md,
    height: 46,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  textInput: { flex: 1, fontSize: FONT.base, color: COLORS.onSurface },
  chipRow: { gap: SPACING.sm, paddingHorizontal: SPACING.lg, height: 56, alignItems: "center" },
  chip: {
    height: 36,
    justifyContent: "center",
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
    flexShrink: 0,
  },
  chipActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  chipText: { color: COLORS.onSurface, fontWeight: "600", fontSize: FONT.sm },
  chipTextActive: { color: "#fff" },
  list: { padding: SPACING.lg, paddingTop: SPACING.md },
  count: { color: COLORS.muted, fontSize: FONT.sm, marginBottom: SPACING.md, fontWeight: "600" },
  card: {
    flexDirection: "row",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  photoWrap: { position: "relative" },
  photo: { width: 64, height: 64, borderRadius: 32 },
  online: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  spec: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  meta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  rating: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.sm },
  dot: { color: COLORS.muted, marginHorizontal: 2 },
  next: { fontSize: FONT.sm, color: COLORS.onSurfaceSecondary, fontWeight: "500" },
  price: { fontSize: FONT.sm, color: COLORS.brandPrimary, fontWeight: "700", marginTop: 4 },
  empty: { alignItems: "center", padding: SPACING.xxl },
  emptyText: { color: COLORS.muted, marginTop: SPACING.md, fontSize: FONT.base },
});
