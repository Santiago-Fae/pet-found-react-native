import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';

const Map = () => {
  const [markers, setMarkers] = useState([
    { id: 1, latitude: -29.1687337, longitude: -51.1336682 },
    { id: 2, latitude: -29.170589, longitude: -51.136589 },
  ]);

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
      <Text>{`Latitude: ${item.latitude}`}</Text>
      <Text>{`Longitude: ${item.longitude}`}</Text>
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
    <View style={{width: '100%', height: '90%',flex: 1}}>
      <MapView style={{width: '100%', height: '100%',flex: 1}}
        ref={mapRef}
        initialRegion={{
          latitude: markers[0].latitude,
          longitude: markers[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
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
          slideStyle={{ marginHorizontal: 10 }}
          onSnapToItem={handleSnapToItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  carouselItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    elevation: 3,
  },
});

export default Map;
