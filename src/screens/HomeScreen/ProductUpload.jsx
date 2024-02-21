import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ProductUpload = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    images: []
  });

  const handleChange = (name, value) => {
    setProduct({ ...product, [name]: value });
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setProduct({ ...product, images: [...product.images, pickerResult.uri] });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('price', product.price);
      product.images.forEach((image, index) => {
        formData.append(`image${index}`, {
          uri: image,
          name: `image_${index}.jpg`,
          type: 'image/jpeg'
        });
      });

      await axios.post('/api/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Alert.alert('Product uploaded successfully!');
      setProduct({
        name: '',
        description: '',
        category: '',
        price: '',
        images: []
      });
    } catch (error) {
      console.error('Error uploading product:', error);
      Alert.alert('An error occurred while uploading the product.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={product.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={product.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={product.category}
        onChangeText={(text) => handleChange('category', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={product.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <Button title="Add Image" onPress={handleImagePicker} />
      {product.images.map((imageUri, index) => (
        <Image key={index} source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
      ))}
      <Button title="Upload Product" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor:  "#eeeeee"
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});

export default ProductUpload;