import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import {Entypo} from '@expo/vector-icons'
import colors from '../utils/globals/colors'
import fonts from '../utils/globals/fonts'
import { useDispatch } from 'react-redux'
import { deleteCartItem } from '../features/cart/cartSlice'

const CartItem = ({item}) => {
    const dispatch = useDispatch()
  return (
        <View style={styles.card}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text2}>P.U.: $ {item.price} </Text>
                <Text style={styles.text2}>Cantidad: {item.quantity}</Text>
                <Text style={styles.text2}>Total: $ {item.price * item.quantity}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.thumbnail }} resizeMode="contain" />
            </View>
            <Pressable onPress={()=> dispatch(deleteCartItem(item.id))}>
                <Entypo name="trash" size={30} color="black"/>
            </Pressable>
            
        </View>
  )
}

export default CartItem

const styles = StyleSheet.create({
    card:{
        backgroundColor:colors.tone3,
        padding:20,
        margin:10,
        borderWidth:2,
        borderRadius:10,
        flexDirection:"row",
        justifyContent:"space-between",
        height:140,
        alignItems:"center"
    },
    textContainer:{
        width:"70%"
    },
    text:{
        color:colors.lightGray,
        fontSize:16,
        fontFamily:fonts.ShantellSansExtraBoldItalic
    },
    text2:{
        color:colors.lightGray,
        fontSize:14,
        fontFamily:fonts.ShantellSansExtraBoldItalic
    },
    imageContainer: {
        width: "25%", // Cambia el ancho del contenedor de la imagen según tu diseño
        alignItems: "left", // Alinear la imagen al centro del contenedor
    },
    image: {
        width: "90%",
        aspectRatio: 1, // Mantener la relación de aspecto para evitar distorsiones
        borderRadius: 5,
    },
})