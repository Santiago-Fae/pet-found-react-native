import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
const PlaceholderImage = require('../../assets/images/im-no-photo.jpg');

const FotoAnimal = ({onFotoChange}) => {
  const [foto, setFoto] = useState(null);
  const imageSource = foto ? { uri: foto } : PlaceholderImage;

  const handleFotoChange = (itemValue) => {
    setFoto(itemValue);
    onFotoChange(itemValue);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
        handleFotoChange(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
      <View>
          <TouchableOpacity onPress={pickImageAsync} style={[styles.mapButton, foto && styles.selectedButton]}>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, foto && styles.selectedButtonText]}>
                {foto ? 'Foto Selecionada' : 'Selecionar Foto'}
              </Text>
              {foto && <FontAwesome name="check" size={20} color="white" style={styles.checkIcon} />}
            </View>
          </TouchableOpacity>
          <Image source={imageSource} style={styles.image} />
      </View>
  );
};

const styles = StyleSheet.create({
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

export default FotoAnimal;
