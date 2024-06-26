import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";

import { fetchPersons } from "./ApiFetcher";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchPersons, setSearchPersons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPersons().then((data) => {
      const filteredData = data.filter((person) => person.state === "1");
      setPersons(data);
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
    setSearchPersons(filtered);
  };

  const handlePersonPress = (person) => {
    navigation.navigate("Details", { person });
  };

  const handleSearch = () => {
    setSearchQuery("");
    navigation.navigate("Search Results", {
      searchResults: searchPersons,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePersonPress(item)}>
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
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuvarande Ledamöter</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a person..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
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
    backgroundColor: "#ffffff",
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
