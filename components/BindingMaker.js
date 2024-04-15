import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { fetchOrganization, fetchRole } from "./ApiFetcher";

export const Binding = ({ binding }) => {
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const getData = async () => {
      const orgData = await fetchOrganization(binding.organization);
      setOrganization(orgData.title);

      const roleData = await fetchRole(binding.role);
      setRole(roleData.title);
    };

    getData();
  }, [binding]);

  return (
    <View style={styles.binding}>
      <Text style={styles.organization}>{organization}</Text>
      <Text style={styles.role}>{role}</Text>
      <Text style={styles.period}>
        {binding.period_start} - {binding.period_end}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
