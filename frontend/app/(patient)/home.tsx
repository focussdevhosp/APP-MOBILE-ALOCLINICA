import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PingoAvatar from "@/src/components/PingoAvatar";
import AnimatedPingo from "@/src/components/AnimatedPingo";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { SPECIALTIES, DOCTORS, APPOINTMENTS, PATIENT_ME } from "@/src/mockData";

export default function PatientHome() {
  const router = useRouter();
  const nextAppt = APPOINTMENTS.find((a) => a.status === "confirmed");
  const topDoctors = DOCTORS.slice(0, 4);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: SPACING.md, flex: 1 }}>
            <Image source={{ uri: PATIENT_ME.photo }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.hello}>Olá,</Text>
              <Text testID="patient-name" style={styles.userName}>{PATIENT_ME.name.split(" ")[0]} 👋</Text>
            </View>
          </View>
          <Pressable testID="btn-notif" onPress={() => router.push("/(patient)/notifications")} style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.onSurface} />
            <View style={styles.dot} />
          </Pressable>
        </View>

        {/* Search */}
        <Pressable
          testID="search-doctors"
          onPress={() => router.push("/(patient)/search")}
          style={styles.search}
        >
          <Ionicons name="search" size={20} color={COLORS.muted} />
          <Text style={styles.searchText}>Buscar médicos ou especialidades</Text>
        </Pressable>

        {/* Next Appointment */}
        {nextAppt && (
          <Pressable
            testID="next-appointment"
            onPress={() => router.push("/(patient)/appointments")}
            style={styles.nextCardWrapper}
          >
            <LinearGradient
              colors={[COLORS.brandPrimary, COLORS.brandDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextCard}
            >
              <View style={styles.nextTop}>
                <Text style={styles.nextLabel}>PRÓXIMA CONSULTA</Text>
                <View style={styles.badge}>
                  <Ionicons name="videocam" size={12} color="#fff" />
                  <Text style={styles.badgeText}>Vídeo</Text>
                </View>
              </View>
              <View style={styles.nextBody}>
                <Image source={{ uri: nextAppt.photo }} style={styles.nextPhoto} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.nextDoc}>{nextAppt.doctorName}</Text>
                  <Text style={styles.nextSpec}>{nextAppt.specialty}</Text>
                </View>
              </View>
              <View style={styles.nextFooter}>
                <View style={styles.nextInfo}>
                  <Ionicons name="calendar-outline" size={14} color="#fff" />
                  <Text style={styles.nextInfoText}>{nextAppt.date}</Text>
                </View>
                <View style={styles.nextInfo}>
                  <Ionicons name="time-outline" size={14} color="#fff" />
                  <Text style={styles.nextInfoText}>{nextAppt.time}</Text>
                </View>
                <Pressable
                  testID="btn-enter-call"
                  onPress={() => router.push("/(patient)/consultation")}
                  style={styles.joinBtn}
                >
                  <Text style={styles.joinBtnText}>Entrar</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </Pressable>
        )}

        {/* Quick Actions */}
        <View style={styles.quickRow}>
          <QuickAction
            icon="videocam"
            color={COLORS.brandPrimary}
            bg={COLORS.brandTertiary}
            label="Consulta"
            onPress={() => router.push("/(patient)/search")}
            testID="q-video"
          />
          <QuickAction
            icon="document-text"
            color="#AF52DE"
            bg="#F4E9FA"
            label="Receitas"
            onPress={() => router.push("/(patient)/prescriptions")}
            testID="q-rx"
          />
          <QuickAction
            icon="flask"
            color="#34C759"
            bg="#E1F8E7"
            label="Exames"
            onPress={() => router.push("/(patient)/exams")}
            testID="q-exams"
          />
          <QuickAction
            icon="medkit"
            color={COLORS.brandSecondary}
            bg="#FFEBD1"
            label="Farmácia"
            onPress={() => router.push("/(patient)/pharmacy")}
            testID="q-pharma"
          />
        </View>

        {/* Pingo Banner */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.banner}>
          <LinearGradient
            colors={[COLORS.brandSecondary, "#FF6B00"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerGrad}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTag}>PROMOÇÃO PINGO 🎉</Text>
              <Text style={styles.bannerTitle}>1ª consulta{"\n"}50% OFF</Text>
              <Text style={styles.bannerDesc}>Clínico geral · Videoconsulta</Text>
            </View>
            <AnimatedPingo variant="celebrating" size={120} animate="alive" />
          </LinearGradient>
        </Animated.View>

        {/* Specialties */}
        <SectionHeader title="Especialidades" onPress={() => router.push("/(patient)/search")} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.specialtiesRow}>
          {SPECIALTIES.map((s) => (
            <Pressable
              key={s.id}
              testID={`spec-${s.id}`}
              onPress={() => router.push(`/(patient)/search?spec=${s.id}`)}
              style={styles.specCard}
            >
              <View style={[styles.specIcon, { backgroundColor: s.color + "22" }]}>
                <Ionicons name={s.icon as any} size={24} color={s.color} />
              </View>
              <Text style={styles.specName}>{s.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Top Doctors */}
        <SectionHeader title="Médicos em destaque" onPress={() => router.push("/(patient)/search")} />
        {topDoctors.map((d) => (
          <Pressable
            key={d.id}
            testID={`doc-${d.id}`}
            onPress={() => router.push(`/(patient)/doctor/${d.id}`)}
            style={styles.docCard}
          >
            <View style={styles.docPhotoWrap}>
              <Image source={{ uri: d.photo }} style={styles.docPhoto} />
              {d.online && <View style={styles.online} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.docName}>{d.name}</Text>
              <Text style={styles.docSpec}>{d.specialty}</Text>
              <View style={styles.docMeta}>
                <Ionicons name="star" size={14} color="#FFCC00" />
                <Text style={styles.docRating}>{d.rating}</Text>
                <Text style={styles.docReviews}>({d.reviews})</Text>
                <Text style={styles.docDot}>•</Text>
                <Text style={styles.docPrice}>R$ {d.price}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
          </Pressable>
        ))}

        {/* Pingo Card */}
        <Pressable
          testID="pingo-cta"
          onPress={() => router.push("/(patient)/pingo")}
          style={styles.pingoCard}
        >
          <PingoAvatar variant="heart" size={64} />
          <View style={{ flex: 1 }}>
            <Text style={styles.pingoTitle}>Pergunte ao Pingo 🐧</Text>
            <Text style={styles.pingoDesc}>
              Tire dúvidas sobre sintomas, medicamentos e mais
            </Text>
          </View>
          <Ionicons name="arrow-forward-circle" size={32} color={COLORS.brandPrimary} />
        </Pressable>

        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, color, bg, label, onPress, testID }: any) {
  return (
    <Pressable testID={testID} onPress={onPress} style={styles.quickBtn}>
      <View style={[styles.quickIcon, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

function SectionHeader({ title, onPress }: { title: string; onPress?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onPress && (
        <Pressable onPress={onPress}>
          <Text style={styles.sectionLink}>Ver tudo</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  scroll: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.lg,
  },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  hello: { fontSize: FONT.sm, color: COLORS.muted },
  userName: { fontSize: FONT.xl, fontWeight: "700", color: COLORS.onSurface },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    ...SHADOW.card,
  },
  dot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    marginBottom: SPACING.lg,
    ...SHADOW.card,
  },
  searchText: { color: COLORS.muted, fontSize: FONT.base },
  nextCardWrapper: { marginBottom: SPACING.lg },
  nextCard: { borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOW.strong },
  nextTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  nextLabel: { color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  badge: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "600" },
  nextBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  nextPhoto: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" },
  nextDoc: { color: "#fff", fontSize: FONT.lg, fontWeight: "700" },
  nextSpec: { color: "rgba(255,255,255,0.85)", fontSize: FONT.sm },
  nextFooter: { flexDirection: "row", alignItems: "center", gap: SPACING.md },
  nextInfo: { flexDirection: "row", alignItems: "center", gap: 4 },
  nextInfoText: { color: "#fff", fontSize: FONT.sm, fontWeight: "600" },
  joinBtn: {
    marginLeft: "auto",
    backgroundColor: "#fff",
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  joinBtnText: { color: COLORS.brandPrimary, fontWeight: "700" },
  quickRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING.lg },
  quickBtn: { alignItems: "center", flex: 1 },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  quickLabel: { fontSize: FONT.sm, color: COLORS.onSurface, fontWeight: "600" },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionTitle: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  sectionLink: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  specialtiesRow: { gap: SPACING.md, paddingBottom: SPACING.sm },
  specCard: { alignItems: "center", width: 80, flexShrink: 0 },
  specIcon: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  specName: { fontSize: 11, color: COLORS.onSurface, textAlign: "center", fontWeight: "600" },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: "#fff",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOW.card,
  },
  docPhotoWrap: { position: "relative" },
  docPhoto: { width: 56, height: 56, borderRadius: 28 },
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
  docName: { fontSize: FONT.base, fontWeight: "700", color: COLORS.onSurface },
  docSpec: { fontSize: FONT.sm, color: COLORS.muted, marginTop: 2 },
  docMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  docRating: { fontSize: FONT.sm, fontWeight: "700", color: COLORS.onSurface },
  docReviews: { fontSize: FONT.sm, color: COLORS.muted },
  docDot: { color: COLORS.muted, marginHorizontal: 2 },
  docPrice: { fontSize: FONT.sm, color: COLORS.brandPrimary, fontWeight: "700" },
  pingoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    backgroundColor: COLORS.brandTertiary,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
  },
  pingoTitle: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.brandDark },
  pingoDesc: { fontSize: FONT.sm, color: COLORS.onBrandTertiary, marginTop: 2 },
  banner: { marginBottom: SPACING.lg, borderRadius: RADIUS.lg, overflow: "hidden", ...SHADOW.strong },
  bannerGrad: { flexDirection: "row", padding: SPACING.lg, alignItems: "center", minHeight: 130 },
  bannerTag: { color: "rgba(255,255,255,0.9)", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  bannerTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 6, lineHeight: 26 },
  bannerDesc: { color: "rgba(255,255,255,0.9)", fontSize: FONT.sm, marginTop: 4 },
});
