import { StatusBar } from "expo-status-bar";
import { StyleSheet, View} from "react-native";
import { useState } from 'react';

import Navbar from './components/Navbar';
import Map from './components/Map';

export default function App() {
  return (
    <View style={styles.container}>
    <Map/>
    <Navbar style={{width: '100%', height: '100%'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
