import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import colors from '../utils/globals/colors';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../features/cart/cartSlice';
import { useGetProductQuery } from '../app/services/shop';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';
import EmptyListComponent from '../components/EmptyListComponent';

const ProductDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { productId } = route.params;
  const { data: product, isLoading, isError, isSuccess } = useGetProductQuery(productId);
  const [mainImage, setMainImage] = useState(null); // Inicialmente establecido como null
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos

  // Verificar y establecer la miniatura al cargar el producto
  useEffect(() => {
    if (isSuccess && product) {
      // Verificar si el producto tiene imágenes y si la miniatura está presente
      if (product.images && product.images.length > 0 && product.thumbnail) {
        setMainImage(product.thumbnail); // Establecer la miniatura como mainImage
      }
    }
  }, [isSuccess, product]);

  const changeMainImage = (image) => {
    setMainImage(image);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error message="¡Ups! Algo salió mal." textButton="Volver" onRetry={() => navigation.goBack()} />;
  if (isSuccess && product === null) return <EmptyListComponent message="El producto no está disponible" />;

  const renderThumbnailItem = (image, index) => (
    <Pressable key={index} onPress={() => changeMainImage(image)}>
      <Image
        style={styles.additionalImage}
        source={{ uri: image }}
        resizeMode='cover'
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{ uri: mainImage }}
                resizeMode='contain'
              />
            </View>
            {product.images.length > 0 && (
              <View style={styles.additionalImagesContainer}>
                <Text style={styles.additionalImagesTitle}>Imágenes del producto:</Text>
                <ScrollView horizontal style={styles.additionalImagesList}>
                  {product.images.map((image, index) => renderThumbnailItem(image, index))}
                </ScrollView>
              </View>
            )}
            <View style={styles.containerText}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.brand}>Marca: {product.brand}</Text>
              <Text>{product?.description}</Text>
            </View>
            <View style={styles.containerPrice}>
              <Text style={styles.price}>$ {product?.price * quantity}</Text>
              <Pressable style={styles.buyNow} onPress={() => dispatch(addCartItem({ ...product, quantity }))}>
                <Text style={styles.buyNowText}>Agregar al carrito</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60,
    marginTop: 10,
  },
  content: {
    width: "100%"
  },
  containerImage: {
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: 300
  },
  additionalImagesContainer: {
    marginVertical: 10,
  },
  additionalImagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  additionalImagesList: {
    flexDirection: 'row',
  },
  additionalImage: {
    width: 50,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  containerText: {
    gap: 25,
    paddingHorizontal: 5,
    paddingVertical: 25
  },
  containerQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  controlButton: {
    backgroundColor: colors.tone2,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  controlButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  containerPrice: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  brand: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 30
  },
  buyNow: {
    backgroundColor: colors.tone1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buyNowText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
  }
});
