import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';

const MapaSelecaoLocal = ({ onSelectLocation, mapHeight }) => {
  const [region, setRegion] = useState({
    latitude: -29.1687337,
    longitude: -51.1336682,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const handleConfirm = () => {
    onSelectLocation(region);
  };

  return (
    <View style={{ height: Dimensions.get('window').height + 100 }}>
      <MapView
        style={{
          flex: 1,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height + 170,
          left: -20,
          top: -170,
        }}
        initialRegion={region}
        onRegionChange={onRegionChange}>
        <Marker.Animated coordinate={region} />
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
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.5,
    flex: 1,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapaSelecaoLocal;
