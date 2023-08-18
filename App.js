import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Navbar from './components/Navbar';
import MapTest from './components/MapTest';
import NewAnimal from './components/NewAnimal';
import ItemDetalhes from './components/ItemDetalhes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="NewAnimal" component={NewAnimal} />
        <Stack.Screen name="MapTest" component={MapTest} />
        <Stack.Screen name="ItemDetalhes" component={ItemDetalhes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen(local) {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapTest />
      <Navbar style={{ width: '100%', height: '100%' }} />
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
