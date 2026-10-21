import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NGOS } from '../data/ngos';
import { usePersistedState } from '../hooks/usePersistedState';

export default function NgosScreen() {
  const insets = useSafeAreaInsets();
  const { value: favoriteIds, setValue: setFavoriteIds } = usePersistedState<string[]>('@petfound/favorite-ngos', []);

  const toggleFavorite = (id: string) =>
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {NGOS.map((ngo) => {
        const favorite = favoriteIds.includes(ngo.id);
        return (
          <List.Item
            key={ngo.id}
            title={ngo.name}
            description={ngo.description}
            style={styles.listItem}
            left={(props) => <List.Icon {...props} icon="cat" />}
            right={() => (
              <TouchableOpacity onPress={() => toggleFavorite(ngo.id)} accessibilityLabel={`Favorite ${ngo.name}`}>
                <List.Icon icon="heart" color={favorite ? 'red' : 'black'} />
                <Text style={styles.count}>{favorite ? 1 : 0}</Text>
              </TouchableOpacity>
            )}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: 'white' },
  listItem: { backgroundColor: '#eceff7', width: '100%', marginBottom: 20 },
  count: { left: 8 },
});
