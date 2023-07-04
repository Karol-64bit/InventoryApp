import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { collection, addDoc, doc, setDoc } from "firebase/firestore"
import { app, db, auth } from "../firebase";

const AddItem = () => {
  const navigation = useNavigation()

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemAmount, setItemAmount] = useState(0);

  const handleAddNewItem = async () => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;

      await setDoc(doc(db, "users", userId), {});

      const docRef = await addDoc(collection(db, "users", userId, "items"), {
        itemName: itemName,
        itemDescription: itemDescription,
        itemAmount: parseInt(itemAmount),
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.replace("Home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const handleNumericInputChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setItemAmount(numericText);
  }

  return (
    <View style={styles.container}>
      <Text>Add new item</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Item name"
          value={itemName}
          onChangeText={text => setItemName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Item description"
          value={itemDescription}
          onChangeText={text => setItemDescription(text)}
          style={[styles.input, styles.textArea]}
          multiline={true}
          numberOfLines={4}
        />
        <TextInput
          placeholder="Item amount"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleNumericInputChange}
        />
      </View>
      <TouchableOpacity
        onPress={handleAddNewItem}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add New Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { navigation.replace("Home") }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back to the menu</Text>
      </TouchableOpacity>
    </View>
  )
}

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

export default AddItem;
