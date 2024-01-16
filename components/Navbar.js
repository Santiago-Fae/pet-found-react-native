import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Navbar = () => {
  const navigation = useNavigation();
  const larguraTela = Dimensions.get('window').width;
  const alturaTela = Dimensions.get('window').height;
  const alturaMenu = alturaTela * 0.1; // 10% da altura da tela

  const [submenuVisible, setSubmenuVisible] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
  };

  const closeSubmenu = () => {
    setSubmenuVisible(false);
  };

  const goTo = (screen) => {
    closeSubmenu(); // Fecha o submenu ao clicar em "NewAnimal"
    navigation.navigate(screen);
  };

  const Map = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={[styles.container, { width: larguraTela, height: alturaMenu }]}>
      <TouchableOpacity onPress={toggleSubmenu} style={styles.botao}>
        <Text style={styles.textoBotao}><AntDesign name="plussquare" size={30} color="black" /></Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={Map} style={styles.botao}>
        <Text style={styles.textoBotao}><FontAwesome name="home" size={30} color="black" /></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}><FontAwesome5 name="paw" size={30} color="black" /></Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={submenuVisible}
        onRequestClose={closeSubmenu}
      >
        <Pressable style={styles.modalOverlay} onPress={closeSubmenu}>
          <Animatable.View
            animation="slideInLeft" // Define a animação desejada
            duration={300} // Define a duração da animação em milissegundos
            style={[styles.submenuContainer, { width: larguraTela * 0.5, height: alturaTela - alturaMenu, padding: 20 }]}
          >
            <Pressable onPress={() => goTo('NewAnimal')} style={styles.submenuItem}>
              <Text style={styles.submenuText}>New Animal</Text>
            </Pressable>
            <Pressable onPress={() => goTo('Ongs')} style={styles.submenuItem}>
              <Text style={styles.submenuText}>Ongs</Text>
            </Pressable>
          </Animatable.View>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submenuContainer: {
    backgroundColor: '#df7f04',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  submenuItem: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  submenuText: {
    fontSize: 18,
  },
});

export default Navbar;
