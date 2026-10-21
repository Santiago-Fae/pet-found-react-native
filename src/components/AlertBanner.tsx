import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { COLORS } from '../data/constants';
import type { Animal } from '../types';

const AUTO_HIDE_MS = 6000;

export default function AlertBanner({ animal, onClose }: { animal: Animal; onClose: () => void }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const t = setTimeout(onClose, AUTO_HIDE_MS);
    return () => clearTimeout(t);
  }, [animal, onClose]);

  return (
    <Animatable.View animation="fadeInDown" duration={300} style={[styles.wrapper, { top: insets.top + 8 }]}>
      <List.Item
        title={animal.name}
        description={`New lost ${animal.species} in your area!`}
        titleStyle={styles.text}
        descriptionStyle={styles.text}
        style={styles.item}
        onPress={onClose}
        left={() => (
          <View style={styles.iconCircle}>
            <List.Icon icon="alert" color={COLORS.warning} style={styles.icon} />
          </View>
        )}
        right={() => <List.Icon icon="close" color="white" />}
      />
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', left: 16, right: 16, zIndex: 999, elevation: 8 },
  item: { backgroundColor: COLORS.warning, borderRadius: 16, paddingVertical: 5 },
  text: { color: 'white', fontSize: 15, fontWeight: '700' },
  iconCircle: { width: 42, height: 42, marginLeft: 10, borderRadius: 21, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' },
  icon: { margin: 0 },
});
