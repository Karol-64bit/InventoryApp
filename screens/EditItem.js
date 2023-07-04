import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const EditItem = ({ route }) => {
  console.log(route.params);
  const navigation = useNavigation();

  const [newItemName, setNewItemName] = useState(route.params.itemName);
  const [newItemAmount, setNewItemAmount] = useState(route.params.itemAmount);
  const [newItemDescription, setNewItemDescription] = useState(
    route.params.itemDescription
  );

  console.log(newItemName, newItemAmount, newItemDescription);


  const handleNumericInputChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setNewItemAmount(numericText);
  }

  const handleEditItem = async () => {
    const user = auth.currentUser;
    const userId = user.uid;
    console.log("OK");
    const itemRef = doc(db, "users", route.params.userId, "items", route.params.itemId);

    try {
      await updateDoc(itemRef, { itemName: newItemName, itemAmount:newItemAmount });
      console.log("Item updated successfully!");    
      navigation.replace("Home");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
<View style={styles.container}>
      <Text>Edit this item</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Item name"
          value={newItemName}
          onChangeText={text => setNewItemName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Item description"
          value={newItemDescription}
          onChangeText={text => setNewItemDescription(text)}
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          placeholder="Item amount"
          value={newItemAmount}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleNumericInputChange}
        />
      </View>
      <TouchableOpacity
        onPress={handleEditItem}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Edit Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { navigation.replace("Home") }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back to the menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});