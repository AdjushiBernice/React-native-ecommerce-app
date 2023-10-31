import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FilterCategory = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['sneakers', 'sandals', 'flats', 'heels'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Category:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => onCategoryChange(itemValue)}
      >
        <Picker.Item label="All" value={null} />
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: 'white',
  },
});

export default FilterCategory;
