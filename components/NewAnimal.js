import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Navbar from './Navbar';
import ImagePicker from 'react-native-image-crop-picker';

const FormularioCadastro = () => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [foto, setFoto] = useState(null);
console.log(ImagePicker)
  const abrirSelecionadorDeImagem = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.error) {
        setFoto(response.path);
      }
    });
  };

  const cadastrar = () => {
    if (nome && local && foto) {
      // Lógica de cadastro aqui
      console.log('Cadastro realizado com sucesso:', { nome, local, foto });
    } else {
      console.log('Por favor, preencha todos os campos obrigatórios.');
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

      <Text>Local:</Text>
      <TextInput
        value={local}
        onChangeText={setLocal}
        placeholder="Digite o local"
      />

      <TouchableOpacity onPress={abrirSelecionadorDeImagem}>
        <Text>Selecionar Foto</Text>
      </TouchableOpacity>

      {foto && <Image source={{ uri: foto }} style={{ width: 100, height: 100 }} />}

      <TouchableOpacity onPress={cadastrar}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <Navbar />
    </View>
  );
};

export default FormularioCadastro;
