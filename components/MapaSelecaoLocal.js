import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions  } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapaSelecaoLocal = ({ onSelectLocationm,  mapHeight }) => {
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
        style={{width: Dimensions.get('window').width, height: '100%'}}
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
      <TouchableOpacity onPress={handleConfirm}>
        <Text>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapaSelecaoLocal;
