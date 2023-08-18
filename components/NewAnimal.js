import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import MapaSelecaoLocal from './MapaSelecaoLocal'; // Importe o novo componente
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // Importe o FontAwesome

const PlaceholderImage = require('../assets/images/background-image.png');

const FormularioCadastro = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [foto, setFoto] = useState(null);
  const [showMapa, setShowMapa] = useState(false);
  const [isSelected, setIsSelected] = useState(false); // Novo estado para controlar a seleção
  const imageSource = foto ? { uri: foto } : PlaceholderImage;

  const onSelectLocation = (location) => {
    setLocal(location);
    setShowMapa(false);
    setIsSelected(true); // Defina como selecionado
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setFoto(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const cadastrar = () => {
    if (local) {
      const data = {
        nome,
        latitude: local.latitude,
        longitude: local.longitude,
        foto,
      };
      // Lógica de cadastro aqui
      navigation.navigate('Main', { teste: data });
    } else {
      alert('Selecione um local no mapa.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setShowMapa(true)} style={[styles.mapButton, isSelected && styles.selectedButton]}>
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
            {local ? 'Local Selecionado' : 'Selecionar Local no Mapa'}
          </Text>
          {isSelected && <FontAwesome name="check" size={20} color="white" style={styles.checkIcon} />}
        </View>

      </TouchableOpacity>

      {showMapa && <MapaSelecaoLocal onSelectLocation={onSelectLocation} local={local} />}

      <TouchableOpacity onPress={pickImageAsync} style={styles.imageButton}>
        <Text style={styles.buttonText}>Selecionar Foto</Text>
      </TouchableOpacity>

      <Image source={imageSource} style={styles.image} />

      <TouchableOpacity onPress={cadastrar} style={styles.submitButton}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <Navbar style={{ zIndex: 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  mapButton: {
    backgroundColor: '#efc23b',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

  selectedButton: {
    backgroundColor: 'green', // Cor verde quando selecionado
  },
  selectedButtonText: {
    color: 'white', // Texto branco quando selecionado
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginLeft: 8,
  },
});

export default FormularioCadastro;
