import { useCallback, useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, Platform,
  type NativeScrollEvent, type NativeSyntheticEvent,
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useAnimals } from '../context/AnimalsContext';
import AnimalImage from '../components/AnimalImage';
import ProfileButton from '../components/ProfileButton';
import { COLORS, DEFAULT_COORDINATES, DEFAULT_DELTAS } from '../data/constants';
import type { Animal } from '../types';

const ITEM_WIDTH = 225;
const ITEM_GAP = 12;
const SNAP = ITEM_WIDTH + ITEM_GAP;

export default function MapScreen() {
  const { animals, foundIds, moveAnimal, isUserAnimal } = useAnimals();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList<Animal>>(null);
  const markerRefs = useRef<Record<string, ComponentRef<typeof Marker> | null>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const initialRegion = useMemo(
    () => ({ ...DEFAULT_DELTAS, ...DEFAULT_COORDINATES }),
    []
  );

  // Center the map on the user, when they allow it.
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const { coords } = await Location.getCurrentPositionAsync({});
        mapRef.current?.animateToRegion(
          { latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 },
          500
        );
      } catch (e) {
        console.warn('Could not get location:', e);
      }
    })();
  }, []);

  const focusAnimal = useCallback((animal: Animal) => {
    setActiveId(animal.id);
    markerRefs.current[animal.id]?.showCallout();
    mapRef.current?.animateToRegion(
      { latitude: animal.latitude, longitude: animal.longitude, latitudeDelta: 0.025, longitudeDelta: 0.025 },
      500
    );
  }, []);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SNAP);
    const animal = animals[Math.min(Math.max(index, 0), animals.length - 1)];
    if (animal) focusAnimal(animal);
  };

  const pinColor = (animal: Animal) =>
    foundIds.includes(animal.id) ? 'green' : activeId === animal.id ? 'blue' : 'red';

  const renderItem = ({ item }: { item: Animal }) => {
    const found = foundIds.includes(item.id);
    return (
      <View style={[styles.carouselItem, item.id === activeId && styles.carouselItemActive]}>
        <AnimalImage photo={item.photo} style={styles.image} />
        <View style={styles.boxText}>
          <Text style={styles.highlightedName}>
            {item.name}
            {found ? ' (found)' : ''}
          </Text>
          <Text style={styles.description}>
            {item.description.length > 55 ? `${item.description.slice(0, 55)}...` : item.description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('AnimalDetails', { animalId: item.id })}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ProfileButton />
      <MapView
        style={[StyleSheet.absoluteFill, styles.map]}
        ref={mapRef}
        initialRegion={initialRegion}
        mapType={Platform.OS === 'android' ? 'none' : 'standard'}
        loadingEnabled
        loadingBackgroundColor="#FFF8EE"
        showsUserLocation
      >
        {Platform.OS === 'android' && (
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            maximumZ={17}
            flipY={false}
          />
        )}
        {animals.map((a, index) => (
          <Marker
            key={a.id}
            ref={(r) => {
              markerRefs.current[a.id] = r;
            }}
            coordinate={{ latitude: a.latitude, longitude: a.longitude }}
            title={a.name}
            pinColor={pinColor(a)}
            draggable={isUserAnimal(a.id)} // only animals the user registered can be moved
            onDragEnd={(e) => moveAnimal(a.id, e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
            onPress={() => {
              setActiveId(a.id);
              listRef.current?.scrollToIndex({ index, animated: true });
            }}
          />
        ))}
      </MapView>
      <FlatList
        ref={listRef}
        style={styles.carousel}
        data={animals}
        keyExtractor={(a) => a.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 - ITEM_GAP / 2 }}
        getItemLayout={(_, index) => ({ length: SNAP, offset: SNAP * index, index })}
        onMomentumScrollEnd={onMomentumEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8EE' },
  map: { backgroundColor: '#EAF4E2' },
  mapAttribution: { position: 'absolute', left: 8, bottom: 148, paddingHorizontal: 5, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.82)', color: '#5C5148', fontSize: 10 },
  carousel: { position: 'absolute', bottom: 18, left: 0, right: 0 },
  carouselItem: {
    width: ITEM_WIDTH,
    marginHorizontal: ITEM_GAP / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    borderColor: '#E8DCCB',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#4A2B12',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  carouselItemActive: { borderColor: COLORS.primary, borderWidth: 2 },
  image: { width: 200, height: 150, marginBottom: 10, borderRadius: 12, alignSelf: 'center' },
  detailsButton: { marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 9, paddingVertical: 9, alignItems: 'center' },
  detailsButtonText: { color: 'white', fontSize: 14, fontWeight: '700' },
  boxText: { backgroundColor: '#FFF4E5', borderRadius: 10, padding: 8, minHeight: 68 },
  highlightedName: { fontWeight: '700', fontSize: 17, marginBottom: 4, textAlign: 'center', color: '#2B211A' },
  description: { fontSize: 12, lineHeight: 17, color: '#5C5148' },
});
