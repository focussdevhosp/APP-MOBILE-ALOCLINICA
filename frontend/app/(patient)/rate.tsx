import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTORS } from "@/src/mockData";

export default function Rate() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const TAGS = ["Pontual", "Atenciosa", "Explicativa", "Empática", "Profissional"];

  const toggle = (t: string) =>
    setTags((arr) => (arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]));

  if (sent) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <StatusBar style="dark" />
        <View style={styles.successWrap}>
          <Animated.View entering={ZoomIn.duration(500).springify()}>
            <AnimatedPingo variant="heart" size={200} animate="alive" />
          </Animated.View>
          <Text style={styles.successTitle}>Obrigado pela avaliação! 💙</Text>
          <Text style={styles.successDesc}>
            Sua opinião ajuda outros pacientes a escolherem o melhor médico.
          </Text>
          <Pressable testID="ok-rate" onPress={() => router.back()} style={styles.okBtn}>
            <Text style={styles.okText}>Voltar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-rate" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <Text style={styles.title}>Avaliar consulta</Text>
        <View style={styles.back} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Animated.View entering={FadeInUp} style={styles.doc}>
          <Image source={{ uri: doctor.photo }} style={styles.photo} />
          <View>
            <Text style={styles.docName}>{doctor.name}</Text>
            <Text style={styles.docSpec}>{doctor.specialty}</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(100)}>
          <Text style={styles.q}>Como foi sua experiência?</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} testID={`star-${n}`} onPress={() => setStars(n)}>
                <Ionicons
                  name={n <= stars ? "star" : "star-outline"}
                  size={44}
                  color="#FFCC00"
                  style={{ marginHorizontal: 4 }}
                />
              </Pressable>
            ))}
          </View>
          <Text style={styles.qHint}>{["Ruim", "Regular", "Bom", "Ótimo", "Excelente"][stars - 1]}</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)}>
          <Text style={styles.q}>Destaques</Text>
          <View style={styles.tagsRow}>
            {TAGS.map((t) => (
              <Pressable
                key={t}
                testID={`tag-${t}`}
                onPress={() => toggle(t)}
                style={[styles.tag, tags.includes(t) && styles.tagActive]}
              >
                <Text style={[styles.tagText, tags.includes(t) && { color: "#fff" }]}>{t}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300)}>
          <Text style={styles.q}>Comentário (opcional)</Text>
          <TextInput
            testID="comment"
            value={comment}
            onChangeText={setComment}
            placeholder="Conte como foi..."
            placeholderTextColor={COLORS.muted}
            multiline
            style={styles.input}
          />
        </Animated.View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.stickyWrap}>
        <Pressable testID="submit-rate" onPress={() => setSent(true)} style={styles.submitBtn}>
          <Text style={styles.submitText}>Enviar avaliação</Text>
        </Pressable>
      </SafeAreaView>
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
  scroll: { padding: SPACING.lg, paddingBottom: 120 },
  doc: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  photo: { width: 52, height: 52, borderRadius: 26 },
  docName: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  docSpec: { color: COLORS.muted, fontSize: FONT.sm },
  q: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.lg, marginBottom: SPACING.sm },
  starsRow: { flexDirection: "row", justifyContent: "center", marginVertical: SPACING.sm },
  qHint: { textAlign: "center", color: COLORS.brandPrimary, fontWeight: "700", marginTop: 4 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#fff",
  },
  tagActive: { backgroundColor: COLORS.brandPrimary, borderColor: COLORS.brandPrimary },
  tagText: { color: COLORS.onSurface, fontWeight: "600" },
  input: {
    minHeight: 100,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT.base,
    textAlignVertical: "top",
    ...SHADOW.card,
  },
  stickyWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SPACING.md,
  },
  submitBtn: {
    height: 54,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.card,
  },
  submitText: { color: "#fff", fontWeight: "800", fontSize: FONT.lg },
  successWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: SPACING.xl },
  successTitle: { fontSize: 26, fontWeight: "800", color: COLORS.onSurface, marginTop: SPACING.lg, textAlign: "center" },
  successDesc: { fontSize: FONT.base, color: COLORS.muted, marginTop: SPACING.sm, textAlign: "center", lineHeight: 22, maxWidth: 300 },
  okBtn: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
  },
  okText: { color: "#fff", fontWeight: "800", fontSize: FONT.lg },
});
