import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Price = ({ handleChange, selectedPriceRange = { min: null, max: null } }) => {
  const handleInternalChange = function(newPriceRange) {
    handleChange(newPriceRange);
  };
    return (
    <View style={styles.ml}>
      <Text style={styles.priceTitle}>Price</Text>

      <TouchableOpacity
        style={styles.labelContainer}
        onPress={() => handleInternalChange({ min: null, max: null })}
      >
        <View style={isAllSelected(selectedPriceRange) ? styles.checkmarkSelected : styles.checkmark} />
        <Text>All</Text>
      </TouchableOpacity>

      <Input handleChange={handleInternalChange} selectedPriceRange={selectedPriceRange} value={{ min: 0, max: 50 }} title="$0 - $50" />
      <Input handleChange={handleInternalChange} selectedPriceRange={selectedPriceRange} value={{ min: 50, max: 100 }} title="$50 - $100" />
      <Input handleChange={handleInternalChange} selectedPriceRange={selectedPriceRange} value={{ min: 100, max: 150 }} title ="$100 - $150" />
      <Input handleChange={handleInternalChange} selectedPriceRange={selectedPriceRange} value={{ min: 150, max: null }} title ="Over $150" />
    </View>
  );
}

const Input = ({ handleChange, selectedPriceRange, value, title }) => {
  const isSelected = isRangeSelected(selectedPriceRange, value);

  return (
    <TouchableOpacity
      style={styles.labelContainer}
      onPress={() => handleChange(value)}
    >
      <View style={isSelected ? styles.checkmarkSelected : styles.checkmark} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const isAllSelected = (selectedPriceRange) => {
  return selectedPriceRange.min === null && selectedPriceRange.max === null;
};

const isRangeSelected = (selectedPriceRange, value) => {
  return (
    selectedPriceRange.min === value.min &&
    selectedPriceRange.max === value.max
  );
};

const styles = StyleSheet.create({
  ml: {
    marginLeft: 10,
  },
  priceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 10,
  },
  checkmarkSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'blue',
    marginRight: 10,
  },
});

export default Price;
