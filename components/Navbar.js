import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const Navbar = () => {
  const larguraTela = Dimensions.get('window').width;
  const alturaMenu = Dimensions.get('window').height * 0.1; // 10% da altura da tela

  return (
    <View style={[styles.container, { width: larguraTela, height: alturaMenu }]}>
      <TouchableOpacity style={styles.botao}>
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
