import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc  } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {FlashList} from '@shopify/flash-list';


const ListScreen = () => {
  const navigation = useNavigation();
  const toTheHomeScreen = () => {
    navigation.replace("Home")
  }

  const [items, setItems] = useState([]);

  const fetchNotes = async () => {
    const user = auth.currentUser;
    const userId = user.uid;



    // Tworzenie zapytania do pobrania notatek użytkownika
    const notesQuery = query(collection(db, 'users', userId, 'items'));

    try {
      // Wykonanie zapytania i pobranie dokumentów
      const querySnapshot = await getDocs(notesQuery);
      
      // Mapowanie danych notatek i zapisanie ich w stanie
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

  const handleEditItem = async (itemId) => {
    const user = auth.currentUser;
    const userId = user.uid;
    // Znajdowanie dokumentu o podanym ID
    const itemRef = doc(db, 'users', userId, 'items', itemId);

    try {
      // Aktualizacja dokumentu
      await updateDoc(itemRef, { itemName: 'Test' });
      console.log('Item updated successfully!');
      fetchNotes();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <View style={styles.container}>

      
      <Text style={styles.heading}>Stock status</Text>

      <View style={styles.main}>
      {console.log(items)}
        {items.map((item) =>{
          return(
          <View key={item.id} style={styles.dateRow}>
            <Text>{item.id}</Text>
            <Text>{item.itemName}</Text>
            <TouchableOpacity
              onPress={()=>handleEditItem(item.id)}
              style={styles.smallButton}
            >
              <Text style={styles.smallButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        )
        })}
      </View>

      <TouchableOpacity
        onPress={toTheHomeScreen}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back to the menu</Text>
      </TouchableOpacity>

      </View>

  )
}

export default ListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80, // Dodaj padding na dole, aby przycisk nie zakrywał treści
  },
  smallButton: {
    backgroundColor: '#0782F9',
    width: '20%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  smallButtonText: {
    color: 'white',
    // fontWeight: '100',
    fontSize: 10,
    justifyContent: 'flex-end',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 8,
  }
})