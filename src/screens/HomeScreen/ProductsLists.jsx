import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TextInput } from "react-native";
import { getProducts } from "../../data/ProductsServices.jsx";
import { Product } from "../../components/Products.jsx";
import CustomFilterDropdown from "../../components/Button.js";

export function ProductsList({ navigation, route }) {
  const productsPerPage = 5;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
  const [priceRange, setPriceRange] = useState(route.params?.selectedPriceRange || { min: null, max: null });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const filteredProducts = products.filter((product) => {
    const title = product.title.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      (selectedCategory ? product.category === selectedCategory : true) &&
      (priceRange.min ? product.price >= priceRange.min : true) &&
      (priceRange.max ? product.price <= priceRange.max : true) &&
      (query ? title.includes(query) : true)
    );
  });

  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  function renderProduct({ item: product }) {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate("ProductDetails", { productId: product.id });
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CustomFilterDropdown
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriceRange={priceRange}
        onPriceChange={handlePriceChange}
      />

      <TextInput
        style={styles.searchInput}
        onChangeText={handleSearch}
        value={searchQuery}
        placeholder="Search products"
      />

      <FlatList
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(item) => item.id.toString()}
        data={productsToDisplay}
        renderItem={renderProduct}
      />

      <View style={styles.pagination}>
        <Button
          title="Previous Page"
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Text>Page {currentPage}</Text>
        <Button
          title="Next Page"
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= products.length}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsList: {
    backgroundColor: "#eeeeee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  filterButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default ProductsList;
