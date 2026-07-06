import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { DOCTORS } from "@/src/mockData";

type Msg = { id: string; sender: "me" | "doc"; text: string; time: string };

const INITIAL: Msg[] = [
  { id: "1", sender: "doc", text: "Olá! Como está se sentindo hoje?", time: "10:14" },
  { id: "2", sender: "me", text: "Melhor, doutora. A pressão estabilizou.", time: "10:15" },
  { id: "3", sender: "doc", text: "Ótimo! Continue o tratamento e me avise se sentir tontura.", time: "10:16" },
];

export default function ChatDoctor() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { id: Date.now().toString(), sender: "me", text: input, time: "agora" }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          id: `d${Date.now()}`,
          sender: "doc",
          text: "Certo, anotei. Posso te ajudar com mais alguma coisa?",
          time: "agora",
        },
      ]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 900);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable testID="back-chat" onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={26} color={COLORS.onSurface} />
        </Pressable>
        <View style={styles.hero}>
          <Image source={{ uri: doctor.photo }} style={styles.photo} />
          <View>
            <Text style={styles.name}>{doctor.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={styles.online} />
              <Text style={styles.status}>Online</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.back}>
          <Ionicons name="videocam" size={24} color={COLORS.brandPrimary} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView ref={scrollRef} contentContainerStyle={styles.chat}>
          {msgs.map((m, i) => (
            <Animated.View
              key={m.id}
              entering={FadeInUp.delay(i * 40).springify()}
              style={[styles.row, m.sender === "me" && { justifyContent: "flex-end" }]}
            >
              {m.sender === "doc" && <Image source={{ uri: doctor.photo }} style={styles.avatar} />}
              <View
                style={[styles.bubble, m.sender === "me" ? styles.bubbleMe : styles.bubbleDoc]}
              >
                <Text style={m.sender === "me" ? styles.textMe : styles.textDoc}>{m.text}</Text>
                <Text style={[styles.time, m.sender === "me" && { color: "rgba(255,255,255,0.7)" }]}>
                  {m.time}
                </Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <Pressable style={styles.attach}>
            <Ionicons name="attach" size={22} color={COLORS.brandPrimary} />
          </Pressable>
          <TextInput
            testID="chat-input"
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={COLORS.muted}
            multiline
            style={styles.textInput}
          />
          <Pressable testID="chat-send" onPress={send} style={styles.send}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.surfaceSecondary },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  back: { minWidth: 32, alignItems: "center" },
  hero: { flex: 1, flexDirection: "row", alignItems: "center", gap: SPACING.sm },
  photo: { width: 40, height: 40, borderRadius: 20 },
  name: { fontWeight: "700", color: COLORS.onSurface, fontSize: FONT.base },
  online: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.success },
  status: { color: COLORS.muted, fontSize: FONT.sm },
  chat: { padding: SPACING.md, gap: SPACING.sm },
  row: { flexDirection: "row", alignItems: "flex-end", gap: 6 },
  avatar: { width: 28, height: 28, borderRadius: 14 },
  bubble: { maxWidth: "78%", padding: SPACING.md, borderRadius: RADIUS.lg },
  bubbleDoc: { backgroundColor: "#fff", borderTopLeftRadius: 4, ...SHADOW.card },
  bubbleMe: { backgroundColor: COLORS.brandPrimary, borderTopRightRadius: 4 },
  textDoc: { color: COLORS.onSurface, fontSize: FONT.base, lineHeight: 20 },
  textMe: { color: "#fff", fontSize: FONT.base, lineHeight: 20 },
  time: { fontSize: 10, color: COLORS.muted, marginTop: 4, alignSelf: "flex-end" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  attach: { padding: 6 },
  textInput: {
    flex: 1,
    fontSize: FONT.base,
    color: COLORS.onSurface,
    backgroundColor: COLORS.surfaceSecondary,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    maxHeight: 100,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.brandPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
});
