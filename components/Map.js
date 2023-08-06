import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import { useState, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

const Map = () => { 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const obterPermissao = async () => {
      try {
        console.log('Obtendo permissão...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'Precisamos da sua permissão para acessar sua localização.',
            buttonNeutral: 'Pergunte-me depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            console.log(position),
            (position) => {
              const { latitude, longitude } = position.coords;
              console.log('Permissão de localização negada');
              setLatitude(latitude); 
              setLongitude(longitude);
            },
            (error) => {
              console.log('Erro ao obter a localização: ', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } else {
          console.log('Permissão de localização negada');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    obterPermissao();
  }, []);

  return (
    <View style={{width: '100%', height: '90%'}}>
      <MapView style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: -29.1687337,
          longitude: -51.1336682,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default Map;
