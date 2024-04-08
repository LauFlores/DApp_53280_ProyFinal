import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import colors from '../utils/globals/colors';
import fonts from '../utils/globals/fonts';

const ProductByCategory = ({ item, navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate("ProductDetail", { productId: item.id })} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
      <View style={styles.containerPrice}>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.thumbnail }} resizeMode="contain" />
      </View>
    </Pressable>
  );
};

export default ProductByCategory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tone3,
    width: "80%",
    marginHorizontal: "10%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    width: "50%",
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.ShantellSansRegular,
  },
  imageContainer: {
    width: "30%", // Cambia el ancho del contenedor de la imagen según tu diseño
    alignItems: "center", // Alinear la imagen al centro del contenedor
  },
  image: {
    width: "100%",
    aspectRatio: 1, // Mantener la relación de aspecto para evitar distorsiones
    borderRadius: 5,
  },
  price:{
    fontSize: 16,
    fontWeight: 'bold',
  }
});
