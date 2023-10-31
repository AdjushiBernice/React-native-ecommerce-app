import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../../../CartContext.jsx';

export function Cart({ navigation }) {
  const { items, removeItemFromCart, getItemsCount, getTotalPrice } = useContext(CartContext);

  function CartItem({ item }) {
    const handleRemoveItem = () => {
      removeItemFromCart(item.id);
    };

    return (
      <View>
        <Text>{item.product.name}</Text>
        <Text>Quantity: {item.qty}</Text>
        <Text>Total Price: $ {item.totalPrice}</Text>
        <TouchableOpacity onPress={handleRemoveItem}>
          <Text style={styles.removeButton}>Remove</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function Totals() {
    let [total, setTotal] = useState(0);
  
    useEffect(() => {
      setTotal(Number(getTotalPrice())); // Convert the total to a number
    }, [items]);
  
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {total}</Text>
      </View>
    );
  }
  
  const renderItem = ({ item }) => (
    <CartItem item={item} />
  );

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
    flexDirection: 'row',
  },
  cartLineTotal: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: '#333333',
  },
  lineRight: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 40,
    color: '#333333',
    textAlign: 'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
