import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { fetchPersons } from "./ApiFetcher";

export const HomeScreen = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPersons().then((data) => {
      const filteredData = data.filter((person) => person.state === "1");
      setPersons(filteredData);
      setFilteredPersons(filteredData);
    });
  }, []);

  useEffect(() => {
    filterPersons();
  }, [searchQuery]);

  const filterPersons = () => {
    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredPersons(filtered);
  };

  const renderItem = ({ item }) => (
    <ListItem containerStyle={styles.personContainer}>
      {item.image !== null ? (
        <Avatar
          source={item.image ? { uri: item.image.url } : null}
          rounded
          resizeMode="cover"
          style={[styles.personImage, { width: 60, height: 60 }]}
        />
      ) : (
        <Text
          style={[
            styles.personImage,
            {
              backgroundColor: "transparent",
              textAlign: "center",
              lineHeight: 55,
              fontSize: 10,
            },
          ]}
        >
          No Image
        </Text>
      )}

      <ListItem.Content>
        <ListItem.Title style={styles.personName}>{item.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuvarande Ledamöter</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a person..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filteredPersons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  personImage: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#f0f0f0",
  },
  personName: {
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
