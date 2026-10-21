import { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAnimals } from '../context/AnimalsContext';
import LocationPicker from '../components/LocationPicker';
import SelectAnimal from '../components/SelectAnimal';
import AnimalPhoto from '../components/AnimalPhoto';
import { savePhoto } from '../utils/photos';
import { COLORS } from '../data/constants';
import type { Coordinates, Species } from '../types';

export default function NewAnimalScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { addAnimal } = useAnimals();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [species, setSpecies] = useState<Species>('dog');

  const reset = () => {
    setName('');
    setDescription('');
    setLocation(null);
    setPhotoUri(null);
    setSpecies('dog');
  };

  const register = () => {
    if (!name.trim()) return Alert.alert('Missing name', "Please enter the animal's name.");
    if (!location) return Alert.alert('Missing location', 'Please select a location on the map.');
    if (!photoUri) return Alert.alert('Missing photo', 'Please select a photo.');

    addAnimal({
      name: name.trim(),
      description: description.trim(),
      latitude: location.latitude,
      longitude: location.longitude,
      photo: savePhoto(photoUri),
      species,
    });
    reset();
    navigation.navigate('Main', { screen: 'Map' });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.container, { paddingTop: insets.top + 16 }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Name:</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Enter the animal's name" style={styles.input} />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter a description"
          style={[styles.input, styles.multiline]}
          multiline
        />
        <SelectAnimal value={species} onChange={setSpecies} />

        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setShowMap(true);
          }}
          style={[styles.mapButton, location && styles.selectedButton]}
        >
          <Text style={styles.buttonText}>{location ? 'Location selected' : 'Select Location on Map'}</Text>
          {location && <FontAwesome name="check" size={20} color="white" style={styles.check} />}
        </TouchableOpacity>

        <AnimalPhoto photoUri={photoUri} onChange={setPhotoUri} />

        <TouchableOpacity onPress={register} style={styles.submitButton}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>

      <LocationPicker
        visible={showMap}
        initial={location}
        onConfirm={(loc) => {
          setLocation(loc);
          setShowMap(false);
        }}
        onCancel={() => setShowMap(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#f4f4f4' },
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, fontSize: 16 },
  multiline: { minHeight: 70, textAlignVertical: 'top' },
  mapButton: {
    backgroundColor: '#efc23b',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  selectedButton: { backgroundColor: COLORS.success },
  submitButton: { backgroundColor: COLORS.primary, borderRadius: 8, padding: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  check: { marginLeft: 8 },
});
