import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";

import { PersonDetailsScreen } from "./components/PersonDetailsScreen";
import { SearchResultsScreen } from "./components/SearchResultsScreen";
import { HomeScreen } from "./components/homeScreen";

export const PersonList = () => {};
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />

          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Parliament Browser" component={HomeScreen} />
            <Stack.Screen
              name="Details"
              component={PersonDetailsScreen}
              options={{ headerBackTitle: "Back" }}
            />
            <Stack.Screen
              name="Search Results"
              component={SearchResultsScreen}
              options={{ headerBackTitle: "Back" }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </SafeAreaView>
      </NavigationContainer>
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
