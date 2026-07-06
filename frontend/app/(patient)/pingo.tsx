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
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PingoAvatar from "@/src/components/PingoAvatar";
import { COLORS, SPACING, RADIUS, FONT, SHADOW } from "@/src/theme";
import { PINGO_INITIAL_MESSAGES, PingoMessage } from "@/src/mockData";

const CANNED_ANSWERS = [
  "Entendi 🐧 Com base no que você descreveu, recomendo agendar uma consulta com um clínico geral. Posso te ajudar com isso agora?",
  "Ótima pergunta! Manter uma boa hidratação e sono regular ajuda muito. Se persistir por mais de 3 dias, procure um médico.",
  "Você pode consultar todas as suas receitas em Prontuário → Receitas. Se preferir, posso te levar até lá agora.",
  "Lembre-se: eu sou um assistente educacional, não substituo consulta médica 💙. Como posso te ajudar mais?",
];

const SUGGESTIONS = [
  "Estou com dor de cabeça",
  "Como agendar uma consulta?",
  "Preciso de uma receita",
  "Efeitos colaterais",
];

export default function PingoChat() {
  const [messages, setMessages] = useState<PingoMessage[]>(PINGO_INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: PingoMessage = {
      id: `u${Date.now()}`,
      sender: "user",
      text,
      time: "agora",
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      const reply: PingoMessage = {
        id: `p${Date.now()}`,
        sender: "pingo",
        text: CANNED_ANSWERS[Math.floor(Math.random() * CANNED_ANSWERS.length)],
        time: "agora",
      };
      setMessages((m) => [...m, reply]);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 800);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <PingoAvatar variant="clipboard" size={44} bg={COLORS.brandTertiary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Pingo</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View style={styles.onlineDot} />
            <Text style={styles.online}>Online agora</Text>
          </View>
        </View>
        <Pressable style={styles.iconBtn}>
          <Ionicons name="ellipsis-vertical" size={22} color={COLORS.onSurface} />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.chat}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m) => (
            <View
              key={m.id}
              style={[styles.bubbleRow, m.sender === "user" && { justifyContent: "flex-end" }]}
            >
              {m.sender === "pingo" && <PingoAvatar variant="clipboard" size={32} bg={COLORS.brandTertiary} />}
              <View
                style={[
                  styles.bubble,
                  m.sender === "pingo" ? styles.bubblePingo : styles.bubbleUser,
                ]}
              >
                <Text style={m.sender === "pingo" ? styles.textPingo : styles.textUser}>
                  {m.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestions}
          >
            {SUGGESTIONS.map((s, i) => (
              <Pressable key={i} testID={`sugg-${i}`} onPress={() => send(s)} style={styles.suggestChip}>
                <Text style={styles.suggestText}>{s}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}

        <View style={styles.inputBar}>
          <Pressable style={styles.attach}>
            <Ionicons name="add-circle-outline" size={26} color={COLORS.brandPrimary} />
          </Pressable>
          <TextInput
            testID="pingo-input"
            value={input}
            onChangeText={setInput}
            placeholder="Escreva sua dúvida..."
            placeholderTextColor={COLORS.muted}
            style={styles.textInput}
            multiline
          />
          <Pressable testID="pingo-send" onPress={() => send(input)} style={styles.send}>
            <Ionicons name="send" size={20} color="#fff" />
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
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: { fontSize: FONT.lg, fontWeight: "700", color: COLORS.onSurface },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  online: { fontSize: FONT.sm, color: COLORS.muted },
  iconBtn: { padding: 6 },
  chat: { padding: SPACING.lg, gap: SPACING.md },
  bubbleRow: { flexDirection: "row", alignItems: "flex-end", gap: SPACING.sm, maxWidth: "100%" },
  bubble: { maxWidth: "78%", padding: SPACING.md, borderRadius: RADIUS.lg },
  bubblePingo: { backgroundColor: "#fff", borderTopLeftRadius: 4, ...SHADOW.card },
  bubbleUser: { backgroundColor: COLORS.brandPrimary, borderTopRightRadius: 4 },
  textPingo: { color: COLORS.onSurface, fontSize: FONT.base, lineHeight: 20 },
  textUser: { color: "#fff", fontSize: FONT.base, lineHeight: 20 },
  suggestions: { padding: SPACING.md, gap: SPACING.sm },
  suggestChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.brandTertiary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    flexShrink: 0,
  },
  suggestText: { color: COLORS.brandPrimary, fontWeight: "600", fontSize: FONT.sm },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    padding: SPACING.md,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  attach: { padding: 4 },
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
