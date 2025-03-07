import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated, Pressable, Modal } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './components/Navbar';
import Map from './components/Map';
import NewAnimal from './components/NewAnimal/NewAnimal';
import ItemDetalhes from './components/ItemDetalhes';
import Ongs from './components/Ongs';
import Test from './components/Test';
import AlertComponent from './components/AlertComponent'; // Import the AlertComponent

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="NewAnimal" component={NewAnimal} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="ItemDetalhes" component={ItemDetalhes} />
        <Stack.Screen name="Ongs" component={Ongs} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function MainScreen(local) {
  const [alertVisible, setAlertVisible] = useState(false);

  const openAlert = () => {
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      openAlert();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map />
      <Navbar style={{ width: '100%', height: '100%' }} />

      <Pressable style={{width: '100%',position: 'absolute', zIndex: 999, opacity: alertVisible ? 1 : 0 }} onPress={() => closeAlert()}>
        <Animated.View style={{ ...styles.alertContainer }}>
          <AlertComponent closeAlert={closeAlert}/>
        </Animated.View>
      </Pressable>
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
