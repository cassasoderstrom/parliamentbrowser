import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";

export const SearchResultsScreen = ({ route }) => {
  const { searchResults } = route.params;
  const navigation = useNavigation();
  const handlePersonPress = (person) => {
    navigation.navigate("Details", { person });
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
      <Text style={styles.title}>Search Results</Text>
      <FlatList
        data={searchResults}
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
