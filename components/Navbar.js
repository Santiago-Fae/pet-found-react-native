import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Navbar = () => {
  const navigation = useNavigation();
  const larguraTela = Dimensions.get('window').width;
  const alturaMenu = Dimensions.get('window').height * 0.1; // 10% da altura da tela

  const newAnimal = () => {
    navigation.navigate('NewAnimal'); // Navega para o componente FormularioCadastro
  };

  return (
    <View style={[styles.container, { width: larguraTela, height: alturaMenu }]}>
      <TouchableOpacity onPress={newAnimal} style={styles.botao}>
        <Text style={styles.textoBotao}>Opção 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Opção 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>Opção 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
