import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';

const MapaSelecaoLocal = ({ onSelectLocation, local }) => {
  const [region, setRegion] = useState({
    latitude: local ? local.latitude : -29.1687337,
    longitude: local ? local.longitude : -51.1336682,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const markerPosition = new AnimatedRegion({
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  useEffect(() => {
    markerPosition.timing({
      latitude: region.latitude,
      longitude: region.longitude,
      duration: 0, // Instant update
    }).start();
  }, [region]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const handleConfirm = () => {
    onSelectLocation(region);
  };

  return (
    <View style={{ position: 'absolute', zIndex: 100, height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
      <MapView
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        initialRegion={region}
        onRegionChange={onRegionChange}>
        <Marker.Animated coordinate={markerPosition} />
      </MapView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o botão horizontalmente
    position: 'absolute',
    bottom: 0.25 * Dimensions.get('window').height,
    left: 0.4 * Dimensions.get('window').width,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapaSelecaoLocal;
