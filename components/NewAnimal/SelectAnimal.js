import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SelectAnimal = ({onAnimalChange}) => {
  const [animal, setAnimal] = useState('cachorro');

  const handleAnimalChange = (itemValue) => {
    setAnimal(itemValue);
    onAnimalChange(itemValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelSelect}>Animal:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={animal}
          onValueChange={(itemValue, itemIndex) => handleAnimalChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Cachorro" value="cachorro" />
          <Picker.Item label="Gato" value="gato" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'left',
    marginBottom: 30,
  },
  labelSelect: {
    fontSize: 16,
    marginBottom: 5,
    flex: 0,
  },
  picker: {
    height: 50,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
});

export default SelectAnimal;
