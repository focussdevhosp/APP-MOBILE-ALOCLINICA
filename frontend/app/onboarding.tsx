import { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PingoAvatar, { PingoVariant } from "@/src/components/PingoAvatar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";

const { width } = Dimensions.get("window");

const SLIDES: { variant: PingoVariant; title: string; desc: string }[] = [
  {
    variant: "waving",
    title: "Olá, eu sou o Pingo!",
    desc: "Seu companheiro de saúde. Aqui você marca consultas em segundos com médicos verificados.",
  },
  {
    variant: "clipboard",
    title: "Tudo em um só lugar",
    desc: "Receitas digitais, resultados de exames e seu prontuário completo sempre à mão.",
  },
  {
    variant: "heart",
    title: "Cuide da sua família",
    desc: "Consultas por vídeo com especialistas de todo o Brasil, quando e onde você precisar.",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== idx) setIdx(i);
  };

  const next = () => {
    if (idx < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (idx + 1) * width, animated: true });
    } else {
      router.replace("/role-select");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.brandPrimary }}>
      <StatusBar style="light" />
      <LinearGradient colors={[COLORS.brandPrimary, "#0056B3"]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.skipRow}>
          <Pressable testID="skip" onPress={() => router.replace("/role-select")}>
            <Text style={styles.skip}>Pular</Text>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {SLIDES.map((s, i) => (
            <View key={i} style={[styles.slide, { width }]}>
              <PingoAvatar variant={s.variant} size={220} />
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.desc}>{s.desc}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === idx && styles.dotActive]}
            />
          ))}
        </View>

        <Pressable testID="ob-next" onPress={next} style={styles.cta}>
          <Text style={styles.ctaText}>{idx === SLIDES.length - 1 ? "Começar agora" : "Próximo"}</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  skipRow: { flexDirection: "row", justifyContent: "flex-end", padding: SPACING.lg },
  skip: { color: "rgba(255,255,255,0.85)", fontWeight: "600", fontSize: FONT.base },
  slide: { alignItems: "center", justifyContent: "center", padding: SPACING.xl },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginTop: SPACING.xl, textAlign: "center" },
  desc: { color: "rgba(255,255,255,0.9)", fontSize: FONT.base, textAlign: "center", marginTop: SPACING.md, lineHeight: 22, maxWidth: 320 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginVertical: SPACING.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.4)" },
  dotActive: { width: 24, backgroundColor: "#fff" },
  cta: {
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.lg,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    ...SHADOW.strong,
  },
  ctaText: { color: COLORS.brandPrimary, fontWeight: "800", fontSize: FONT.lg },
});
