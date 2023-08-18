import React from 'react';
import Navbar from './Navbar';

import { View, Text, StyleSheet, Image } from 'react-native';

const ItemDetalhes = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      {item.foto ? (
        <Image source={{ uri: item.foto }} style={styles.image} />
      ) : null}
      <Text style={styles.text}>{`Latitude: ${item.latitude}`}</Text>
      <Text style={styles.text}>{`Longitude: ${item.longitude}`}</Text>
      <Text style={styles.text}>{`Nome: ${item.nome}`}</Text>
      <Navbar style={{ zIndex: 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ItemDetalhes;
