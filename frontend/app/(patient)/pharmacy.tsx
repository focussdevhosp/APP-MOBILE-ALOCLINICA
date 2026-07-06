import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const PRODUCTS = [
  {
    id: "prod1",
    name: "Losartana Potássica 50mg",
    price: 24.9,
    old: 32.0,
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format&fit=crop",
    tag: "Prescrito",
  },
  {
    id: "prod2",
    name: "Vitamina D 2000UI",
    price: 45.5,
    old: 60.0,
    img: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&auto=format&fit=crop",
    tag: "Popular",
  },
  {
    id: "prod3",
    name: "Paracetamol 750mg",
    price: 12.9,
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&auto=format&fit=crop",
  },
  {
    id: "prod4",
    name: "Omeprazol 20mg",
    price: 18.9,
    img: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  { id: "all", label: "Todos", icon: "grid" },
  { id: "rx", label: "Receita", icon: "document-text" },
  { id: "vit", label: "Vitaminas", icon: "leaf" },
  { id: "dor", label: "Dor", icon: "flame" },
  { id: "pele", label: "Pele", icon: "flower" },
];

export default function Pharmacy() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-pharma" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Farmácia</Text>
        <Pressable style={styles.back}>
          <Ionicons name="cart-outline" size={22} color={COLORS.onSurface} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={COLORS.muted} />
          <TextInput
            placeholder="Buscar medicamentos"
            placeholderTextColor={COLORS.muted}
            style={styles.textInput}
          />
        </View>

        <View style={styles.promoCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>Frete grátis</Text>
            <Text style={styles.promoDesc}>Em compras acima de R$ 99</Text>
          </View>
          <Ionicons name="bicycle" size={48} color="#fff" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {CATEGORIES.map((c, i) => (
            <Pressable key={c.id} testID={`cat-${c.id}`} style={[styles.chip, i === 0 && styles.chipActive]}>
              <Ionicons name={c.icon as any} size={16} color={i === 0 ? "#fff" : COLORS.onSurface} />
              <Text style={[styles.chipText, i === 0 && { color: "#fff" }]}>{c.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.section}>Recomendados</Text>
        <View style={styles.grid}>
          {PRODUCTS.map((p) => (
            <Pressable key={p.id} style={styles.prodCard} testID={`prod-${p.id}`}>
              <View style={styles.prodImgWrap}>
                <Image source={{ uri: p.img }} style={styles.prodImg} contentFit="cover" />
                {p.tag && (
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{p.tag}</Text>
                  </View>
                )}
              </View>
              <Text numberOfLines={2} style={styles.prodName}>{p.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>R$ {p.price.toFixed(2)}</Text>
                {p.old && <Text style={styles.old}>R$ {p.old.toFixed(2)}</Text>}
              </View>
              <Pressable style={styles.addBtn} testID={`add-${p.id}`}>
                <Ionicons name="add" size={18} color="#fff" />
              </Pressable>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "#fff",
    paddingHorizontal: SPACING.md,
    height: 50,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  textInput: { flex: 1, fontSize: FONT.base, color: COLORS.onSurface },
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.brandSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  promoTitle: { color: "#fff", fontSize: FONT.xl, fontWeight: "800" },
  promoDesc: { color: "rgba(255,255,255,0.9)", fontSize: FONT.sm, marginTop: 4 },
  chipRow: { gap: SPACING.sm, height: 56, alignItems: "center" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 36,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.border,
    flexShrink: 0,
  },
  chipActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  chipText: { fontWeight: "600", color: COLORS.onSurface, fontSize: FONT.sm },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.md, marginBottom: SPACING.md },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.md },
  prodCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  prodImgWrap: { position: "relative" },
  prodImg: { width: "100%", height: 100, borderRadius: RADIUS.sm },
  tag: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  tagText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  prodName: { fontSize: FONT.sm, fontWeight: "600", color: COLORS.onSurface, marginTop: SPACING.sm, minHeight: 34 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: SPACING.xs, marginTop: 4 },
  price: { fontSize: FONT.base, fontWeight: "800", color: COLORS.onSurface },
  old: { fontSize: 11, color: COLORS.muted, textDecorationLine: "line-through" },
  addBtn: {
    position: "absolute",
    right: SPACING.md,
    bottom: SPACING.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
});
