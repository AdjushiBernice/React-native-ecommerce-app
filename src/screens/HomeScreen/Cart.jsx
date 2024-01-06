import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CartContext } from "../../../CartContext.jsx";
import { RadioButton } from "react-native-paper";

export function Cart({ navigation }) {
  const { items, removeItemFromCart, getItemsCount, getTotalPrice } =
    useContext(CartContext);
  const [showRentModal, setShowRentModal] = useState(false);
  const [productPrice, setProdutPrice] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const [rentalPrice, setRentalPrice] = useState("");
  const [totalRentalPrice, setTotalRentalPrice] = useState(false);

  function CartItem({ item }) {
    const handleRemoveItem = () => {
      removeItemFromCart(item.id);
      setRentalPrice(0);
    };

    const handleRentButton = () => {
      setShowRentModal(true);
    };
    const handleBuyButton = () => {
      let initialPrice = item.product.price;
      setProdutPrice(initialPrice);
      navigation.navigate("PaymentScreen");
    };

    const handleRentConfirm = () => {
      let totalPrice = (item.product.price / 4) * rentalDays;
      setRentalPrice(totalPrice);
      setTotalRentalPrice(true);
      console.log(`Total Price for ${rentalDays} days: $${totalPrice}`);
      setShowRentModal(false);
      return totalPrice;
    };

    const handleRentCancel = () => {
      setShowRentModal(false);
    };

    let rental = item.product.price / 4;

    return (
      <View>
        <Text>{item.product.name}</Text>
        <Text>Quantity: {item.qty}</Text>

        <Text>Total Price: $ {item.totalPrice}</Text>
        <Text>Rental Price: ${rentalPrice ? rentalPrice : rental}</Text>
        <TouchableOpacity onPress={handleRemoveItem}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRentButton}>
          <Text style={styles.rentButton}>Rent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBuyButton}>
          <Text style={styles.rentButton}>Buy</Text>
        </TouchableOpacity>
        <Modal visible={showRentModal} animationType="none">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Select rental duration:</Text>
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={styles.radioButtonContainer}
                  onPress={() => setRentalDays(value)}
                >
                  <Text>{`${value} day${value > 1 ? "s" : ""}`}</Text>
                  <RadioButton
                    value={value}
                    status={rentalDays === value ? "checked" : "unchecked"}
                  />
                </TouchableOpacity>
              ))}
              <View style={styles.buttons}>
                <Button title="Confirm" onPress={handleRentConfirm} />
                <Button title="Cancel" onPress={handleRentCancel} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  function Totals() {
    let [total, setTotal] = useState(0);

    useEffect(() => {
      if (items.length > 0) {
        setTotal(Number(getTotalPrice()));
      } else {
        setTotal(0);
      }
    }, [items]);

    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>
          $ {totalRentalPrice ? rentalPrice : total}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }) => <CartItem item={item} />;

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.product.id.toString()}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: "row",
  },
  cartLineTotal: {
    flexDirection: "row",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: "bold",
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: "#333333",
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
  },
  rentButton: {
    fontWeight: "bold",
    color: "blue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: "ccc",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
