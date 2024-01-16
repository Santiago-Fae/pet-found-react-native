import React from 'react';
import Navbar from './Navbar';
import { List } from 'react-native-paper';


import { View, Text, StyleSheet, Image } from 'react-native';

const Ongs = ({ route }) => {

  return (
  <View style={styles.container}>
    <List.Item
      title="Ong name"
      description="Ong description"
      left={props => <List.Icon {...props} icon="cat" />}
    />
    <List.Item
      title="Ong name"
      description="Ong description"
      left={props => <List.Icon {...props} icon="cat" />}
    />
    <Navbar style={{ zIndex: 2 }} />
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Ongs;
