import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import colors from '../utils/globals/colors';
import fonts from '../utils/globals/fonts';

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                {order.createdAt}
                </Text>
                <Text style={styles.text2}>$ {order.total}</Text>
                {showDetails && (
                  <FlatList
                      data={order.items}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => <Text style={styles.text3}> *** {item.title} - Cantidad: {item.quantity} - P.U.: $ {item.price}</Text>}
                  />
                )}
            </View>
            <TouchableOpacity onPress={toggleDetails}>
                <Feather name={showDetails ? "chevron-up" : "chevron-down"} size={30} color="black" />
            </TouchableOpacity>
        </View>

  );
}

export default OrderItem;

const styles = StyleSheet.create({
    
  card: {
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center" // Alinear al centro verticalmente
  },
  textContainer: {
    flex: 1, // Ocupa todo el espacio disponible en el contenedor
    marginRight: 10, // Agrega margen derecho para separar del ícono
  },
  text: {
    fontSize: 17,
    fontFamily: fonts.ShantellSansExtraBoldItalic
  },
  text2: {
    fontSize: 19,
    fontFamily: fonts.ShantellSansExtraBoldItalic,
    color: "grey"
  },
  text3:{
    fontSize: 14,
    fontFamily: fonts.ShantellSansExtraBoldItalic,
    color: colors.tone1,
    margin:10,
    marginBottom: 10
}
});
