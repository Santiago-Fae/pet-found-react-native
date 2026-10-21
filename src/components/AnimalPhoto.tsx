import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../data/constants';

const PlaceholderImage = require('../../assets/images/im-no-photo.jpg');

interface Props {
  /** URI of the picked image (not yet stored in the app's directory). */
  photoUri: string | null;
  onChange: (uri: string) => void;
}

export default function AnimalPhoto({ photoUri, onChange }: Props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    const uri = result.assets?.[0]?.uri;
    if (!result.canceled && uri) onChange(uri);
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage} style={[styles.button, photoUri && styles.selected]}>
        <Text style={styles.buttonText}>{photoUri ? 'Photo selected' : 'Select Photo'}</Text>
        {photoUri && <FontAwesome name="check" size={20} color="white" style={styles.check} />}
      </TouchableOpacity>
      <Image source={photoUri ? { uri: photoUri } : PlaceholderImage} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#efc23b',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },
  selected: { backgroundColor: COLORS.success },
  buttonText: { color: 'white', fontSize: 16 },
  check: { marginLeft: 8 },
  image: { width: 160, height: 160, marginBottom: 15, alignSelf: 'center' },
});
