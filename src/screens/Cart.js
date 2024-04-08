import { StyleSheet, Text, View,FlatList,Pressable } from 'react-native'
import CartItem from '../components/CartItem'
import fonts from '../utils/globals/fonts'
import { useSelector,useDispatch} from 'react-redux'
import { usePostOrderMutation } from '../app/services/orders'
import { deleteCart } from '../features/cart/cartSlice'

const Cart = ({navigation}) => {

    const dispatch = useDispatch()
    const cart = useSelector((state)=> state.cart)
    const localId = useSelector((state)=> state.auth.localId)
    const [triggerAddOrder] = usePostOrderMutation()

    const handlerAddOrder = async () => {
        const createdAt = new Date().toLocaleString()
        const order = {
            createdAt,
            ...cart
        }
        await triggerAddOrder({localId,order})
        dispatch(deleteCart())
        navigation.navigate("OrdersStack")


    }

  return (
    <View style={styles.container}>
        <FlatList
        data={cart.items}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> <CartItem item={item}/>}
        />
        <Text style={styles.confirmTotal}>Total a pagar: $ {cart.total}</Text>
        <View style={styles.confirmContainer}>
            <Pressable onPress={handlerAddOrder}>
                <Text style={styles.confirmText}>Confirmar</Text>
            </Pressable>
        </View>        
        
        
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"space-between",
        marginBottom:130
    },
    confirmContainer:{
        flexDirection:"row",
        backgroundColor:"gray",
        padding:25,
        justifyContent:"center",
    },
    confirmText:{
        fontFamily:fonts.ShantellSansRegular,
        fontSize:20,
        color:"white",
    },
    confirmTotal:{
        fontFamily:fonts.ShantellSansRegular,
        fontSize:20,
        color:"black",
    }
})