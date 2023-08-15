import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Navbar from './Navbar';
import MapTest from './MapTest';
import * as ImagePicker from 'expo-image-picker';
import MapaSelecaoLocal from './MapaSelecaoLocal'; // Importe o novo componente
import { useNavigation } from '@react-navigation/native';

const PlaceholderImage = require('../assets/images/background-image.png');

const FormularioCadastro = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [foto, setFoto] = useState(null);
  const [showMapa, setShowMapa] = useState(false); // Estado para controlar a exibição do mapa
  const imageSource = foto ? { uri: foto } : PlaceholderImage;

  const onSelectLocation = (location) => {
    setLocal(location);
    setShowMapa(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const cadastrar = () => {
    if (local) {
      // Lógica de cadastro aqui
      navigation.navigate('Main', { teste: [local] });
    } else {
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
      />

      <TouchableOpacity onPress={() => setShowMapa(true)}>
        <Text>Selecionar Local no Mapa</Text>
      </TouchableOpacity>

      {/* Exibe o mapa quando showMapa for verdadeiro */}
      {showMapa && <MapaSelecaoLocal onSelectLocation={onSelectLocation} mapHeight={200} />}


      <TouchableOpacity onPress={pickImageAsync}>
        <Text>Selecionar Foto</Text>
      </TouchableOpacity>

      <Image source={imageSource} style={{ width: 100, height: 100 }} />

      <TouchableOpacity onPress={cadastrar}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <Navbar />
    </View>
  );
};

export default FormularioCadastro;
