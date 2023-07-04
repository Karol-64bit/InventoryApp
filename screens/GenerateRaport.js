import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';



const GenerateRaport = () => {

    const [items, setItems] = useState([]);

  const fetchNotes = async () => {
    const user = auth.currentUser;
    const userId = user.uid;

    const notesQuery = query(collection(db, 'users', userId, 'items'));

    try {
      const querySnapshot = await getDocs(notesQuery);

      const fetchedNotes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setItems(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const navigation = useNavigation()

  const handleGenerateRaport = async () => {

        try {
          const pdfContent = [];
      
          for (const data of items) {
            const text = `Title: ${data.title}\nContent: ${data.content}\Amount: ${data.amount}`;
            pdfContent.push(text);
          }
      
          const htmlContent = pdfContent.join('<br>');

          const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
          const fileName = 'raport.pdf';
          const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
          await FileSystem.moveAsync({
            from: uri,
            to: fileUri,
          });
      
          await Sharing.shareAsync(fileUri);
      
          console.log('PDF file has been saved and shared:', fileUri);
        } catch (error) {
          console.error('An error occurred while generating and saving the PDF file:', error);
        }


    navigation.replace("Home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
    >

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleGenerateRaport}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Generate report</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default GenerateRaport

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
