import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { Species } from '../types';

export default function SelectAnimal({ value, onChange }: { value: Species; onChange: (value: Species) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Animal:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  picker: { height: 50 },
  pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, width: '100%' },
});
