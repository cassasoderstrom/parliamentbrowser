import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";

import { HomeScreen } from "./components/homeScreen";

export const PersonList = () => {};

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <HomeScreen />
        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    alignItems: "flex-start",
    fontSize: 30,
    fontWeight: "bold",
    margin: 5,
  },
});
