import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ListScreen = () => {
  const navigation = useNavigation();
  const toTheHomeScreen = () => {
    navigation.replace("Home")
  }

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const user = auth.currentUser;
      const userId = user.uid;

      // Tworzenie zapytania do pobrania notatek użytkownika
      const notesQuery = query(collection(db, 'users', userId, 'notes'));

      try {
        // Wykonanie zapytania i pobranie dokumentów
        const querySnapshot = await getDocs(notesQuery);
        
        // Mapowanie danych notatek i zapisanie ich w stanie
        const fetchedNotes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          
        }));
        console.log(querySnapshot.docs[0])
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
    console.log(notes)
  }, []);

  return (
    <View>
      <Text>test2</Text>
      <TouchableOpacity
        onPress={toTheHomeScreen}
        style={styles.button}
      >
        <Text style={styles.buttonText}>To The List</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.heading}>Notatki</Text>
        {notes.map(note => {
  const data = note._document?.data();
  const itemName = data?.itemName || "";
  const itemDescription = data?.itemDescription || "";
  const noteId = note._document?.key.path.segments[1];

  return (
    <View key={noteId} style={styles.noteContainer}>
      <Text style={styles.noteTitle}>{itemName}</Text>
      <Text style={styles.noteDescription}>{itemDescription}</Text>
    </View>
  );
})}
      </View>
    </View>
  )
}

export default ListScreen

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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noteContainer: {
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noteDescription: {
    fontSize: 16,
  },
})