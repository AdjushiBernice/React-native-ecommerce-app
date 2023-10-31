import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FilterCategory from '../category/Category.jsx';
import Price from '../category/Price.jsx';

const CustomFilterDropdown = ({ selectedCategory, onCategoryChange, selectedPriceRange, onPriceChange }) => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleDropdown = () => {
    setExpanded(!isExpanded);
  };

  const handleCategoryChange = (newCategory) => {
    onCategoryChange(newCategory);
    setExpanded(false);
  };

  const handlePriceChange = (newPriceRange) => {
    onPriceChange(newPriceRange);
    setExpanded(false); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={toggleDropdown}>
        <Text style={styles.filterButtonText}>Filter Options</Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.dropdownContent}>
          <FilterCategory selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          <Price handleChange={handlePriceChange} selectedPriceRange={selectedPriceRange} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContent: {
    marginTop: 10,
  },
});

export default CustomFilterDropdown;
