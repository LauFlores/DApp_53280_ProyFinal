import { StyleSheet,FlatList, SafeAreaView} from 'react-native'
import OrderItem from '../components/OrderItem'
import { useSelector } from 'react-redux'
import { useGetOrdersQuery } from '../app/services/orders'

const Orders = () => {

  const localId = useSelector((state) => state.auth.localId)
  const {data:orders} = useGetOrdersQuery(localId)

  return (
    <SafeAreaView style={styles.safeArea}>
        <FlatList
        data={orders}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> <OrderItem order={item}/>}
        />

    </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom:130
  },
})