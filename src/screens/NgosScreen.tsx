import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NGOS } from '../data/ngos';
import { usePersistedState } from '../hooks/usePersistedState';
import { COLORS } from '../data/constants';

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
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
            left={(props) => <List.Icon {...props} icon="cat" color={COLORS.ngoText} />}
            right={() => (
              <TouchableOpacity onPress={() => toggleFavorite(ngo.id)} accessibilityLabel={`Favorite ${ngo.name}`}>
                <List.Icon icon="heart" color={favorite ? '#B82D25' : COLORS.ngoText} />
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
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#FFF8EE' },
  listItem: { backgroundColor: COLORS.ngoCard, width: '100%', marginBottom: 20, borderRadius: 12 },
  itemTitle: { color: COLORS.ngoText, fontWeight: '700' },
  itemDescription: { color: '#4F465B' },
  count: { left: 8, color: COLORS.ngoText },
});
