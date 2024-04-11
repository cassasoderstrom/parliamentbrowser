import { Text, View, StyleSheet } from "react-native";

export async function fetchPersons() {
  const response = await fetch("https://api.lagtinget.ax/api/persons.json");
  return await response.json();
}
