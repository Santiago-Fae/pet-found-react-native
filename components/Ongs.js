import React, { useState } from 'react';
import Navbar from './Navbar';
import { List } from 'react-native-paper';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Ongs = ({ route }) => {
  const [heartCount, setHeartCount] = useState({});

  const handleHeartClick = (ongName) => {
    const newHeartCount = { ...heartCount };
    newHeartCount[ongName] = (newHeartCount[ongName] || 0) + 1;
    setHeartCount(newHeartCount);
  };

  const handleHeartUnclick = (ongName) => {
    const newHeartCount = { ...heartCount };
    newHeartCount[ongName] = Math.max((newHeartCount[ongName] || 0) - 1, 0);
    setHeartCount(newHeartCount);
  };

  return (
    <View style={styles.container}>
      <List.Item
        title="Ong name 1"
        description="Ong description 1"
        style={styles.listItem}
        left={(props) => <List.Icon {...props} icon="cat" />}
        right={() => (
          <TouchableOpacity
            onPress={() =>
              heartCount['Ong name 2'] ? handleHeartUnclick('Ong name 2') : handleHeartClick('Ong name 2')
            }
          >
            <List.Icon
              icon="heart"
              color={heartCount['Ong name 2'] ? 'red' : 'black'}
            />
            <Text style={{ left: 8}}>
              {heartCount['Ong name 2'] || 0}
            </Text>
          </TouchableOpacity>
        )}
      />
      <List.Item
        title="Ong name 1"
        description="Ong description 1"
        style={styles.listItem}
        left={(props) => <List.Icon {...props} icon="cat" />}
        right={() => (
          <TouchableOpacity
            onPress={() =>
              heartCount['Ong name 1'] ? handleHeartUnclick('Ong name 1') : handleHeartClick('Ong name 1')
            }
          >
            <List.Icon
              icon="heart"
              color={heartCount['Ong name 1'] ? 'red' : 'black'}
            />
            <Text style={{ left: 8}}>
              {heartCount['Ong name 1'] || 0}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Navbar style={{ zIndex: 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'left',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  listItem: {
    backgroundColor: '#eceff7',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    color: 'white',
  },
});

export default Ongs;
