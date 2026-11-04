import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAnimals } from '../context/AnimalsContext';
import AnimalImage from '../components/AnimalImage';
import { COLORS } from '../data/constants';
import type { Animal } from '../types';

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { animals, favoriteIds, foundIds, toggleFavorite } = useAnimals();
  const favorites = animals.filter((animal) => favoriteIds.includes(animal.id));

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.title}>My favorites</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <FontAwesome5 name="heart" size={36} color={COLORS.muted} />
          <Text style={styles.emptyTitle}>No favorite animals yet</Text>
          <Text style={styles.emptyDescription}>
            Favorite an animal from its details to find it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(animal) => animal.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <FavoriteCard
              animal={item}
              found={foundIds.includes(item.id)}
              onPress={() => navigation.navigate('AnimalDetails', { animalId: item.id })}
              onRemove={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

function FavoriteCard({
  animal,
  found,
  onPress,
  onRemove,
}: {
  animal: Animal;
  found: boolean;
  onPress: () => void;
  onRemove: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} accessibilityLabel={`View ${animal.name}`}>
      <AnimalImage photo={animal.photo} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.animalName}>{animal.name}</Text>
        <Text style={styles.status}>{found ? 'Found' : 'Still lost'}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {animal.description || 'No description available.'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        accessibilityLabel={`Remove ${animal.name} from favorites`}
      >
        <FontAwesome5 name="heart" solid size={20} color="#D9362B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8EE', paddingHorizontal: 20 },
  title: { color: '#2B211A', fontSize: 26, fontWeight: '700', marginBottom: 16 },
  list: { paddingBottom: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8DCCB',
    elevation: 3,
    shadowColor: '#4A2B12',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 88, height: 88, borderRadius: 12, backgroundColor: '#F1E8DC' },
  cardContent: { flex: 1, paddingHorizontal: 12 },
  animalName: { color: '#2B211A', fontSize: 18, fontWeight: '700', marginBottom: 3 },
  status: { color: COLORS.accent, fontSize: 13, fontWeight: '700', marginBottom: 5 },
  description: { color: '#5C5148', fontSize: 13, lineHeight: 18 },
  removeButton: { padding: 8 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  emptyTitle: { color: '#2B211A', fontSize: 19, fontWeight: '700', marginTop: 14 },
  emptyDescription: { color: '#5C5148', fontSize: 14, marginTop: 8, textAlign: 'center' },
});
