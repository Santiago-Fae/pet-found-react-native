import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAdoption } from '../context/AdoptionContext';
import AnimalImage from '../components/AnimalImage';
import { COLORS } from '../data/constants';
import { savePhoto, toImageSource } from '../utils/photos';
import type { AdoptionAnimal } from '../types';

export default function AdoptionScreen() {
  const insets = useSafeAreaInsets();
  const { animals, loaded, addAnimal, updateAnimal, removeAnimal } = useAdoption();
  const [editing, setEditing] = useState<AdoptionAnimal | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const openNew = () => {
    setEditing(null);
    setFormVisible(true);
  };

  const openEdit = (animal: AdoptionAnimal) => {
    setEditing(animal);
    setFormVisible(true);
  };

  const confirmRemove = (animal: AdoptionAnimal) =>
    Alert.alert('Delete animal', `Do you want to delete ${animal.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeAnimal(animal.id) },
    ]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Animals for adoption</Text>
          <Text style={styles.subtitle}>Find a new friend for your family</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={openNew} accessibilityLabel="Add animal for adoption">
          <FontAwesome5 name="plus" size={18} color="white" />
        </TouchableOpacity>
      </View>
      {loaded && (
        <FlatList
          data={animals}
          keyExtractor={(animal) => animal.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <AnimalImage photo={item.photo} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.animalName}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={3}>{item.description || 'No description.'}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => openEdit(item)} style={styles.editButton}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => confirmRemove(item)} style={styles.deleteButton}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
      <AdoptionForm
        visible={formVisible}
        animal={editing}
        onCancel={() => setFormVisible(false)}
        onSave={(input) => {
          if (editing) updateAnimal(editing.id, input);
          else addAnimal(input);
          setFormVisible(false);
        }}
      />
    </View>
  );
}

function AdoptionForm({
  visible,
  animal,
  onCancel,
  onSave,
}: {
  visible: boolean;
  animal: AdoptionAnimal | null;
  onCancel: () => void;
  onSave: (input: Omit<AdoptionAnimal, 'id'>) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | number | null>(null);

  const reset = () => {
    setName(animal?.name ?? '');
    setDescription(animal?.description ?? '');
    setPhoto(animal?.photo ?? null);
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    const uri = result.assets?.[0]?.uri;
    if (!result.canceled && uri) setPhoto(uri);
  };

  const save = () => {
    if (!name.trim()) return Alert.alert('Name required', "Enter the animal's name.");
    if (!photo) return Alert.alert('Photo required', 'Select a photo of the animal.');
    onSave({
      name: name.trim(),
      description: description.trim(),
      photo: typeof photo === 'string' && photo.includes('://') ? savePhoto(photo) : photo,
    });
  };

  const imageSource = photo ? toImageSource(photo) : null;

  return (
    <Modal visible={visible} animationType="slide" onShow={reset} onRequestClose={onCancel}>
      <KeyboardAvoidingView style={styles.modal} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <Text style={styles.formTitle}>{animal ? 'Edit animal' : 'New animal for adoption'}</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Enter the animal's name" style={styles.input} />
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter a description"
            style={[styles.input, styles.multiline]}
            multiline
          />
          <TouchableOpacity onPress={pickPhoto} style={styles.photoButton}>
            <Text style={styles.buttonText}>{photo ? 'Change photo' : 'Select photo'}</Text>
          </TouchableOpacity>
          {imageSource && <Image source={imageSource} style={styles.preview} />}
          <View style={styles.formActions}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={save} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8EE', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { color: '#2B211A', fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#5C5148', fontSize: 13, marginTop: 4 },
  addButton: { backgroundColor: COLORS.primary, borderRadius: 22, padding: 13 },
  list: { paddingBottom: 20 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 12, marginBottom: 14, flexDirection: 'row', borderWidth: 1, borderColor: '#E8DCCB', elevation: 3 },
  image: { width: 110, height: 110, borderRadius: 12, backgroundColor: '#F1E8DC' },
  cardContent: { flex: 1, paddingLeft: 12 },
  animalName: { color: '#2B211A', fontSize: 18, fontWeight: '700', marginBottom: 5 },
  description: { color: '#5C5148', fontSize: 13, lineHeight: 18 },
  actions: { flexDirection: 'row', marginTop: 10, gap: 8 },
  editButton: { backgroundColor: '#E7F0FF', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12 },
  editText: { color: COLORS.primary, fontWeight: '600' },
  deleteButton: { backgroundColor: '#FDE9E7', borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12 },
  deleteText: { color: '#B82D25', fontWeight: '600' },
  modal: { flex: 1, backgroundColor: '#FFF8EE' },
  form: { padding: 20, paddingTop: 60 },
  formTitle: { color: '#2B211A', fontSize: 24, fontWeight: '700', marginBottom: 22 },
  label: { color: '#2B211A', fontSize: 15, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: 'white', borderWidth: 1, borderColor: '#D8CBBE', borderRadius: 8, padding: 11, marginBottom: 16, fontSize: 16 },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  photoButton: { backgroundColor: COLORS.warning, borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 14 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  preview: { width: 180, height: 180, borderRadius: 12, alignSelf: 'center', marginBottom: 20 },
  formActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10 },
  cancelButton: { borderWidth: 1, borderColor: '#B7A99A', borderRadius: 8, padding: 12 },
  cancelText: { color: '#5C5148', fontSize: 16 },
  saveButton: { backgroundColor: COLORS.primary, borderRadius: 8, padding: 12, paddingHorizontal: 22 },
});
