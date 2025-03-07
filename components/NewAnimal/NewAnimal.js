import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';
import Navbar from '../Navbar';
import MapaSelecaoLocal from './Actions/MapaSelecaoLocal';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import SelectAnimal from './Actions/SelectAnimal';
import AnimalPhoto from './Actions/AnimalPhoto';

const FormularioCadastro = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [foto, setPhoto] = useState(null);
  const [showMapa, setShowMapa] = useState(false);
  const [animal, setAnimal] = useState('dog'); // New state for the select input

  const onSelectLocation = (location) => {
    setLocal(location);
    setShowMapa(false);
  };


  const cadastrar = () => {
    if (local) {
      const data = {
        nome,
        descricao,
        latitude: local.latitude,
        longitude: local.longitude,
        foto,
        animal,
      };
      navigation.navigate('Main', { teste: data });
    } else {
      alert('Please select a location on the map.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Enter the animal's name"
        style={styles.input}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Enter a description"
        style={styles.input}
      />
      <SelectAnimal onAnimalChange={(animal) => setAnimal(animal)} />

      <TouchableOpacity onPress={() => { Keyboard.dismiss(); setShowMapa(true) }} style={[styles.mapButton, local && styles.selectedButton]}>
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonText, local && styles.selectedButtonText]}>
            {local ? 'Location Selected' : 'Select Location on Map'}
          </Text>
          {local && <FontAwesome name="check" size={20} color="white" style={styles.checkIcon} />}
        </View>
      </TouchableOpacity>

      {showMapa && <MapaSelecaoLocal onSelectLocation={onSelectLocation} local={local} />}

      <AnimalPhoto onPhotoChange={(foto) => setPhoto(foto)} />

      <TouchableOpacity onPress={cadastrar} style={styles.submitButton}>
        <Text style={styles.buttonText}>Register</Text>
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
    backgroundColor: 'green',
  },
  selectedButtonText: {
    color: 'white',
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
