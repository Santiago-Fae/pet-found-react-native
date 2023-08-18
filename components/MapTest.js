import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { useRoute, useNavigation } from '@react-navigation/native';

const Map = () => {
  const [markers, setMarkers] = useState([
    { id: 1, latitude: -29.1687337, longitude: -51.1336682, nome: 'A' },
  ]);
  const route = useRoute();

  const navigation = useNavigation();
  const handleDetailsButton = item => {
    // Navegar para a tela de detalhes com as informações do item
    navigation.navigate('ItemDetalhes', { item });
  };

  useEffect(() => {
    if (route.params?.teste) {
      route.params.teste.id = markers.length + 1;
      setMarkers(prevMarkers => [...prevMarkers, route.params.teste]);
    }
  }, [route.params?.teste]);

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(0);

  const carouselRef = useRef(null); // Ref for the Carousel

  const handleMarkerDrag = (e, markerIndex) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkers(prevMarkers =>
      prevMarkers.map((m, index) =>
        index === markerIndex ? { ...m, latitude, longitude } : m
      )
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      { item.foto ? <Image source={{ uri: item.foto }} style={styles.image} /> : ''}
      <Text>{`Latitude: ${item.latitude}`}</Text>
      <Text>{`Longitude: ${item.longitude}`}</Text>
      <Text>{`Nome: ${item.nome}`}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => handleDetailsButton(item)}>
        <Text style={styles.detailsButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  const handleSnapToItem = index => {
    setSelectedMarkerIndex(index); // Set the selected marker index
    // Snap the map to the selected marker's position
    const marker = markers[index];
    mapRef.current.animateToRegion(
      {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
      500
    );
  };


  const mapRef = useRef(null); // Ref for the MapView

  return (
    <View style={{ width: '100%', height: '90%', flex: 1 }}>
      <MapView
        style={{ width: '100%', height: '100%', flex: 1 }}
        ref={mapRef}
        initialRegion={{
          latitude: markers[0].latitude,
          longitude: markers[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            draggable
            onDragEnd={e => handleMarkerDrag(e, index)}
            onPress={() => {
              carouselRef.current.snapToItem(index); // Snap to the selected marker's index
            }}
          />
        ))}
      </MapView>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={markers}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={handleSnapToItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center',
  },
  carouselItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: 'center',
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Map;
