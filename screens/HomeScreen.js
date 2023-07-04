import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'

const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const toTheList = () => {
    navigation.replace("ListScreen")
  }

  const toTheAddItem = () => {
    navigation.replace("AddItem")
  }

  const toGenerateRaport = () => {
    navigation.replace("GenerateRaport")
  }


  return (
    <View style={styles.container}>
      <Text>Account email: {auth.currentUser?.email}</Text>

      <TouchableOpacity
        onPress={toTheList}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Item list</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toTheAddItem}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add new item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toGenerateRaport}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create raport</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

    </View>
  )
}

export default HomeScreen

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
  buttonSignOut: {
    backgroundColor: '#9F0028',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },

})