import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import React from 'react'

const ListScreen = () => {

    const navigation = useNavigation()
    
    const toTheHomeScreen = () =>{
        navigation.replace("Home")
    }

    return (
        <View>
            <Text>test</Text>
            <TouchableOpacity
                onPress={toTheHomeScreen}
                style={styles.button}
                >
                <Text style={styles.buttonText}>To The List</Text>
            </TouchableOpacity>
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
  })