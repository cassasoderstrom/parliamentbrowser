import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";

import { fetchPerson } from "./ApiFetcher";
import { Binding } from "./BindingMaker";

export const PersonDetailsScreen = ({ route }) => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetchPerson(route.params.person.id).then((data) => {
      setPerson(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      {person !== null ? (
        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Text style={styles.label}>Name:</Text>
                <Text>{person.name}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>City:</Text>
                <Text>{person.city}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Birthday:</Text>
                <Text>{person.birthday}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Profession:</Text>
                <Text>{person.profession}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Email:</Text>
                <Text>{person.email}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.label}>Phone:</Text>
                <Text>{person.phone}</Text>
              </View>
            </View>
            <View style={{ marginLeft: "auto" }}>
              <Avatar
                source={person.image ? { uri: person.image.url } : null}
                rounded
                resizeMode="cover"
                containerStyle={styles.avatarContainer}
                style={styles.avatar}
              />
            </View>
          </View>
          <ScrollView
            style={styles.bindingsContainer}
            contentContainerStyle={styles.bindingsContent}
          >
            {person.bindings.map((binding, index) => (
              <Binding key={index} binding={binding} />
            ))}
            <View style={styles.scrollEndPadding} />
          </ScrollView>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  bindingsContainer: {
    marginTop: 20,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  binding: {
    marginBottom: 10,
  },
  organization: {
    fontSize: 18,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 3,
  },
  period: {
    fontSize: 14,
  },
  avatarContainer: {
    borderRadius: 120,
    overflow: "hidden",
  },
  avatar: {
    width: 150,
    height: 150,
  },
  bindingsContent: {
    paddingBottom: 100,
  },
  scrollEndPadding: {
    height: 200,
  },
});
