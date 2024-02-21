import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AddProduct = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.addproduct}>
      <Text style={styles.text}
        onPress={() => {
          navigation.navigate('ProductUpload');
        }}> 
        + Add</Text>
    </View>
  )
}

export default AddProduct

const styles = StyleSheet.create({
    addproduct: {
        backgroundColor: 'orange',
        padding: 8,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: 'white',
        fontWeight: 'bold',
      }, 
})