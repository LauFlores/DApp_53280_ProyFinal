import { StyleSheet, Text, View,FlatList } from 'react-native'
import { useGetCategoriesQuery } from '../app/services/shop.js'
import CardCategory from './CardCategory'
import LoadingSpinner from './LoadingSpinner'
import EmptyListComponent from './EmptyListComponent'
import Error from './Error'

const Categories = ({navigation}) => {

  const {data:categories,isError,isLoading,isSuccess} = useGetCategoriesQuery()

  const onRetry = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  if(isLoading) return <LoadingSpinner/>
  if(isError) return <Error message="¡Ups! Algo salió mal." textButton="Recargar" onRetry={onRetry}/>
  if(isSuccess && categories === null) return <EmptyListComponent message="Sin Categorias"/>
  
  return (
    <View style={styles.CategoryContainer}>
      <FlatList
      data={categories}
      keyExtractor={item => item.title}
      renderItem={({item})=> <CardCategory item={item} navigation={navigation}/>}
      horizontal={false}

      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  CategoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})