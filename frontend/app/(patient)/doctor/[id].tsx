import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTORS } from "@/src/mockData";

export default function DoctorProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.surface }}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View>
          <Image source={{ uri: doctor.photo }} style={styles.hero} />
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent", "rgba(0,0,0,0.7)"]}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={["top"]} style={styles.heroSafe}>
            <View style={styles.heroNav}>
              <Pressable testID="back-doctor" onPress={() => router.back()} style={styles.roundBtn}>
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </Pressable>
              <Pressable style={styles.roundBtn}>
                <Ionicons name="heart-outline" size={22} color="#fff" />
              </Pressable>
            </View>
          </SafeAreaView>

          <View style={styles.heroBottom}>
            <Text style={styles.heroName}>{doctor.name}</Text>
            <Text style={styles.heroSpec}>{doctor.specialty}</Text>
            <Text style={styles.heroCrm}>{doctor.crm}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <StatItem icon="star" value={doctor.rating.toString()} label={`${doctor.reviews} avaliações`} />
          <View style={styles.statDivider} />
          <StatItem icon="briefcase" value={`${doctor.yearsExp}+`} label="Anos exp." />
          <View style={styles.statDivider} />
          <StatItem icon="people" value="1.2k+" label="Pacientes" />
        </View>

        {/* Bio */}
        <View style={{ paddingHorizontal: SPACING.lg }}>
          <Text style={styles.section}>Sobre</Text>
          <Text style={styles.bio}>{doctor.bio}</Text>

          <Text style={styles.section}>Serviços</Text>
          <View style={styles.serviceGrid}>
            <ServiceCard icon="videocam" title="Videoconsulta" price={doctor.price} />
            <ServiceCard icon="location" title="Presencial" price={doctor.price + 60} />
          </View>

          <Text style={styles.section}>Horários disponíveis</Text>
          <View style={styles.timesRow}>
            {["09:00", "10:30", "14:00", "15:30", "17:00"].map((t) => (
              <View key={t} style={styles.timeChip}>
                <Text style={styles.timeText}>{t}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.section}>Avaliações</Text>
          <ReviewCard name="Marina S." rating={5} text="Excelente profissional! Muito atenciosa e clara nas explicações." />
          <ReviewCard name="Pedro L." rating={5} text="Consulta pontual e super humanizada, recomendo!" />
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <SafeAreaView edges={["bottom"]} style={styles.stickyWrap}>
        <View style={styles.sticky}>
          <View>
            <Text style={styles.priceLabel}>Videoconsulta</Text>
            <Text style={styles.priceValue}>R$ {doctor.price}</Text>
          </View>
          <Pressable
            testID="book-cta"
            onPress={() => router.push(`/(patient)/booking?id=${doctor.id}`)}
            style={styles.bookBtn}
          >
            <Text style={styles.bookText}>Agendar Consulta</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

function StatItem({ icon, value, label }: any) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Ionicons name={icon} size={18} color={COLORS.brandPrimary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ServiceCard({ icon, title, price }: any) {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceIcon}>
        <Ionicons name={icon} size={22} color={COLORS.brandPrimary} />
      </View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.servicePrice}>R$ {price}</Text>
    </View>
  );
}

function ReviewCard({ name, rating, text }: any) {
  return (
    <View style={styles.review}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={styles.reviewName}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          {Array.from({ length: rating }).map((_, i) => (
            <Ionicons key={i} name="star" size={14} color="#FFCC00" />
          ))}
        </View>
      </View>
      <Text style={styles.reviewText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { width: "100%", height: 380 },
  heroSafe: { position: "absolute", top: 0, left: 0, right: 0 },
  heroNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.lg,
  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBottom: { position: "absolute", bottom: SPACING.lg, left: SPACING.lg, right: SPACING.lg },
  heroName: { fontSize: 26, fontWeight: "800", color: "#fff" },
  heroSpec: { fontSize: FONT.lg, color: "rgba(255,255,255,0.9)", marginTop: 2 },
  heroCrm: { fontSize: FONT.sm, color: "rgba(255,255,255,0.75)", marginTop: 4 },
  stats: {
    flexDirection: "row",
    marginHorizontal: SPACING.lg,
    marginTop: -30,
    backgroundColor: "#fff",
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOW.strong,
  },
  statDivider: { width: 1, backgroundColor: COLORS.border, marginVertical: 4 },
  statValue: { fontSize: FONT.lg, fontWeight: "800", color: COLORS.onSurface, marginTop: 4 },
  statLabel: { fontSize: 11, color: COLORS.muted, marginTop: 2, textAlign: "center" },
  section: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface, marginTop: SPACING.xl, marginBottom: SPACING.sm },
  bio: { color: COLORS.onSurfaceSecondary, lineHeight: 22, fontSize: FONT.base },
  serviceGrid: { flexDirection: "row", gap: SPACING.md },
  serviceCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.brandTertiary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.sm,
  },
  serviceTitle: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  servicePrice: { fontSize: FONT.sm, color: COLORS.brandPrimary, fontWeight: "700", marginTop: 2 },
  timesRow: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  timeChip: {
    backgroundColor: COLORS.brandTertiary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  timeText: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  review: {
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  reviewName: { fontWeight: "700", color: COLORS.onSurface },
  reviewText: { color: COLORS.onSurfaceSecondary, marginTop: 4, lineHeight: 20, fontSize: FONT.sm },
  stickyWrap: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: COLORS.border },
  sticky: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  priceLabel: { fontSize: FONT.sm, color: COLORS.muted },
  priceValue: { fontSize: FONT.xl, fontWeight: "800", color: COLORS.onSurface },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.brandPrimary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: 14,
    borderRadius: RADIUS.pill,
  },
  bookText: { color: "#fff", fontWeight: "700", fontSize: FONT.base },
});
