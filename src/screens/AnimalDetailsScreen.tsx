import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAnimals } from '../context/AnimalsContext';
import AnimalImage from '../components/AnimalImage';
import { COLORS } from '../data/constants';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AnimalDetails'>;

export default function AnimalDetailsScreen({ route, navigation }: Props) {
  const { animalId } = route.params;
  const insets = useSafeAreaInsets();
  const { animals, favoriteIds, foundIds, isUserAnimal, toggleFavorite, toggleFound, removeAnimal } = useAnimals();
  const animal = animals.find((a) => a.id === animalId);

  if (!animal) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.description}>This animal no longer exists.</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
          <Text style={styles.actionText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isFavorite = favoriteIds.includes(animal.id);
  const isFound = foundIds.includes(animal.id);

  const confirmDelete = () =>
    Alert.alert('Delete animal', `Remove ${animal.name} from this device?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          navigation.goBack();
          removeAnimal(animal.id);
        },
      },
    ]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20, paddingTop: insets.top + 8, paddingBottom: insets.bottom + 20 }}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityLabel="Back">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.card}>
        <AnimalImage photo={animal.photo} style={styles.image} />
        <Text style={styles.title}>{animal.name}</Text>
        <Text style={styles.status}>{isFound ? 'Found' : 'Still lost'}</Text>
        <Text style={styles.description}>{animal.description || 'No description available.'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Actions</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleFavorite(animal.id)}>
          <Text style={styles.actionText}>{isFavorite ? 'Remove from favorites' : 'Favorite'}</Text>
          <FontAwesome5 style={styles.icon} name="heart" solid={isFavorite} size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleFound(animal.id)}>
          <Text style={styles.actionText}>{isFound ? 'Mark as lost again' : 'Mark as found'}</Text>
          <FontAwesome5 style={styles.icon} name="check" size={15} color="white" />
        </TouchableOpacity>
        {isUserAnimal(animal.id) && (
          <TouchableOpacity style={[styles.actionButton, styles.danger]} onPress={confirmDelete}>
            <Text style={styles.actionText}>Delete</Text>
            <FontAwesome5 style={styles.icon} name="trash" size={15} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  center: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  backButton: { alignSelf: 'flex-start', padding: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  image: { width: 250, height: 200, borderRadius: 15, borderWidth: 1, borderColor: '#ddd', alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333', textAlign: 'center' },
  status: { fontSize: 14, fontWeight: 'bold', color: COLORS.accent, textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 16, color: COLORS.muted, textAlign: 'center' },
  actionButton: { marginTop: 10, backgroundColor: COLORS.primary, borderRadius: 5, padding: 10, flexDirection: 'row', justifyContent: 'center' },
  danger: { backgroundColor: '#d9362b' },
  actionText: { color: 'white', fontSize: 14 },
  icon: { marginLeft: 8, marginTop: 2 },
});
