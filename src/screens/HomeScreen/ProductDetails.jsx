import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Button,
} from "react-native";
import { getProduct } from "../../data/ProductsServices.jsx";
import { CartContext } from "../../../CartContext.jsx";

export function ProductDetails({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    setProduct(getProduct(productId));
  });

  const { addItemToCart } = useContext(CartContext);

  function onAddToCart() {
    addItemToCart(product.id);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={product.image}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>$ {product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Button onPress={onAddToCart} title="Add To Cart" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageWrapper: {
    width: 300, 
    height: 300, 
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
});
