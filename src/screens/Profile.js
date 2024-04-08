import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import AddButton from '../components/AddButton';
import { useSelector } from 'react-redux';
import { useGetImageQuery, useGetUserLocationQuery } from '../app/services/profile';
import colors from '../utils/globals/colors';

const Profile = ({ navigation }) => {
  const localId = useSelector((state) => state.auth.localId);
  const userEmail = useSelector((state) => state.auth.email); // Obtener el email del usuario desde el estado global de Redux
  const { data: locationFormatted } = useGetUserLocationQuery(localId);
  const { data } = useGetImageQuery(localId);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(userEmail); // Establecer el email del usuario en el estado local al cargar el componente
  }, [userEmail]);

  return (
    <View style={styles.container}>
      <Image
        source={data ? { uri: data.image } : require("../../assets/user.png")}
        style={styles.image}
        resizeMode='cover'
      />
      <Text style={styles.text}>{locationFormatted?.address}</Text>
      <AddButton title={"Agregar Imagen de perfil"} onPress={() => navigation.navigate("ImageSelector")} />
      <AddButton title={"Agregar Dirección"} onPress={() => navigation.navigate("LocationSelector")} />
      <Text style={styles.EmailLogin}>Email de login:</Text>
      <TextInput
        style={styles.email}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={false} // No permitir editar el correo electrónico
      />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    gap: 15,
  },
  image: {
    width: 200,
    height: 200
  },
  text: {
    fontSize: 16,
    width: "70%",
    marginVertical: 10,
    color: colors.tone3,
    fontWeight: 'bold',
  },
  EmailLogin: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
  email: {
    height: 40,
    width: '70%',
    borderColor: 'gray',
    fontWeight: 'bold',
    borderWidth: 1,
    marginTop: 5,
    fontSize: 15,
    paddingHorizontal: 10,
  },
});
