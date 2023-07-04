import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebase';

const ListScreen = () => {
  const user = auth.currentUser;
  const userId = user.uid;
  const navigation = useNavigation();
  const toTheHomeScreen = () => {
    navigation.replace("Home")
  }

  const toTheEditScreen = (userId, itemId, itemName, itemAmount, itemDescription) => {
    navigation.navigate("EditItem", {
      userId: userId,
      itemId: itemId,
      itemName: itemName,
      itemAmount: itemAmount,
      itemDescription: itemDescription
    });
  };

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

  const increaseAmount = async (itemId, itemAmount) => {
    const itemRef = doc(db, "users", userId, "items", itemId);
    const newAmount = itemAmount + 1;
    try {
      await updateDoc(itemRef, { itemAmount: newAmount });
      console.log("Item updated successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const decreaseAmount = async (itemId, itemAmount) => {
    const itemRef = doc(db, "users", userId, "items", itemId);
    const newAmount = itemAmount - 1;
    try {
      await updateDoc(itemRef, { itemAmount: newAmount });
      console.log("Item updated successfully!");
      fetchNotes();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;

      await deleteDoc(doc(db, "users", userId, "items", itemId));
      console.log("Document deleted with ID: ", itemId);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stock status</Text>

      <View style={styles.table}>
        {items.map((item) => {
          return (
            <View key={item.id} style={styles.tableRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.itemAmount}>{item.itemAmount}</Text>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => decreaseAmount(item.id, item.itemAmount)}
                  style={[styles.smallButton, styles.decreaseButton]}
                >
                  <Icon name="minus" size={20} color="white" />
                  {/* <Text style={styles.smallButtonText}>-</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => increaseAmount(item.id, item.itemAmount)}
                  style={[styles.smallButton, styles.increaseButton]}
                >
                  <Icon name="plus" size={20} color="white" />
                  {/* <Text style={styles.smallButtonText}>+</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => toTheEditScreen(userId, item.id, item.itemName, item.itemAmount, item.itemDescription)}
                  style={[styles.smallButton, styles.editButton]}
                >
                  <Icon name="edit" size={20} color="white" />
                  {/* <Text style={styles.smallButtonText}>Edit</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteItem(item.id)}
                  style={[styles.smallButton, styles.deleteButton]}
                >
                  <Icon name="trash" size={20} color="white" />
                  {/* <Text style={styles.smallButtonText}>Delete</Text> */}
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={toTheHomeScreen} style={styles.button}>
        <Text style={styles.buttonText}>Back to the menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '95%',
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    marginRight: 16,
    fontSize: 16,
  },
  itemAmount: {
    fontSize: 16,
    color: '#555',
  },
  buttons: {
    flexDirection: 'row',
  },
  smallButton: {
    backgroundColor: '#0782F9',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  smallButtonText: {
    // color: 'white',
    fontSize: 16,
  },
  decreaseButton: {
    backgroundColor: '#0782F9',
  },
  increaseButton: {
    backgroundColor: '#0782F9',
  },
  editButton: {
    backgroundColor: '#07F93A',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
});

export default ListScreen;
