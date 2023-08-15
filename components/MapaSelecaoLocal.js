import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapaSelecaoLocal = ({ onSelectLocation,  mapHeight }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation);
    }
  };
  return (
    <View style={{ flex: 1, height: mapHeight }}>
      <MapView
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.9, top: -100}}
        initialRegion={{
          latitude: selectedLocation ? selectedLocation.latitude : -29.1687337,
          longitude: selectedLocation ? selectedLocation.longitude : -51.1336682,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
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
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 50,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapaSelecaoLocal;
