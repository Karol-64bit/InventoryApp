import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const EditItem = ({ route }) => {
    
    console.log(route.params);
    const navigation = useNavigation();
    const toTheHomeScreen = () => {
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <Text>{route.params.userId}</Text>
      <Text>{route.params.itemId}</Text>
      <Text>{route.params.itemName}</Text>
      <Text>{route.params.itemAmount}</Text>
      <TouchableOpacity onPress={toTheHomeScreen} style={styles.button}>
        <Text style={styles.buttonText}>Back to the menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    justifyContent: "flex-end",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80, // Dodaj padding na dole, aby przycisk nie zakrywał treści
  },
  smallButton: {
    backgroundColor: "#0782F9",
    width: "20%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  smallButtonText: {
    color: "white",
    // fontWeight: '100',
    fontSize: 10,
    justifyContent: "flex-end",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});