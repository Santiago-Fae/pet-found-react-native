import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5, AntDesign  } from '@expo/vector-icons';

const Navbar = () => {
  const navigation = useNavigation();
  const larguraTela = Dimensions.get('window').width;
  const alturaMenu = Dimensions.get('window').height * 0.1; // 10% da altura da tela

  const newAnimal = () => {
    navigation.navigate('NewAnimal');
  };
  const Map = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { width: larguraTela, height: alturaMenu }]}>
      <TouchableOpacity onPress={newAnimal} style={styles.botao}>
        <Text style={styles.textoBotao}><AntDesign name="plussquare" size={30} color="black" /></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Map} style={styles.botao}>
        <Text style={styles.textoBotao}><FontAwesome name="home" size={30} color="black" /></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}><FontAwesome5 name="paw" size={30} color="black" /></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#df7f04',
    paddingHorizontal: 20,
  },
  botao: {
    paddingVertical: 10,
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Navbar;
