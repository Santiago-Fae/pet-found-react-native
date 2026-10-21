import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import MapView, { UrlTile, type Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, DEFAULT_COORDINATES, DEFAULT_DELTAS } from '../data/constants';
import type { Coordinates } from '../types';

interface Props {
  visible: boolean;
  initial: Coordinates | null;
  onConfirm: (location: Coordinates) => void;
  onCancel: () => void;
}

// Full-screen map with a fixed pin at the center; the chosen location is the map's center.
export default function LocationPicker({ visible, initial, onConfirm, onCancel }: Props) {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>({ ...DEFAULT_DELTAS, ...(initial ?? DEFAULT_COORDINATES) });

  useEffect(() => {
    if (!visible || initial) return;
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const { coords } = await Location.getCurrentPositionAsync({});
        mapRef.current?.animateToRegion({ ...DEFAULT_DELTAS, latitude: coords.latitude, longitude: coords.longitude }, 400);
      } catch (e) {
        console.warn('Could not get location:', e);
      }
    })();
  }, [visible, initial]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={[StyleSheet.absoluteFill, styles.map]}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
          mapType={Platform.OS === 'android' ? 'none' : 'standard'}
          loadingEnabled
          loadingBackgroundColor="#FFF8EE"
        >
          {Platform.OS === 'android' && (
            <UrlTile
              urlTemplate="https://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
              maximumZ={17}
              flipY={false}
            />
          )}
        </MapView>
        <View pointerEvents="none" style={styles.pinWrapper}>
          <FontAwesome name="map-marker" size={40} color="#d9362b" style={styles.pin} />
        </View>
        <View style={[styles.actions, { bottom: insets.bottom + 24 }]}>
          <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onConfirm({ latitude: region.latitude, longitude: region.longitude })}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { backgroundColor: '#EAF4E2' },
  attribution: { position: 'absolute', left: 8, bottom: 112, paddingHorizontal: 5, paddingVertical: 2, backgroundColor: 'rgba(255,255,255,0.82)', color: '#5C5148', fontSize: 10 },
  pinWrapper: { ...StyleSheet.flatten(StyleSheet.absoluteFill), alignItems: 'center', justifyContent: 'center' },
  pin: { marginBottom: 40 }, // the pin's tip sits on the exact center
  actions: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 12 },
  button: { backgroundColor: COLORS.primary, borderRadius: 8, paddingVertical: 14, paddingHorizontal: 28 },
  cancel: { backgroundColor: COLORS.muted },
  buttonText: { color: 'white', fontSize: 18 },
});
