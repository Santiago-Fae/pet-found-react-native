import { StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../data/constants';

export default function ProfileButton() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Pressable
      accessibilityLabel="NGOs"
      style={[styles.button, { top: insets.top + 12 }]}
      onPress={() => navigation.navigate('Main', { screen: 'Ngos' })}
    >
      <FontAwesome name="user" size={18} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
});
