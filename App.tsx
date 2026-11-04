import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AnimalsProvider } from './src/context/AnimalsContext';
import { AdoptionProvider } from './src/context/AdoptionContext';
import Tabs from './src/navigation/Tabs';
import AnimalDetailsScreen from './src/screens/AnimalDetailsScreen';
import NewAnimalAlert from './src/components/NewAnimalAlert';
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AnimalsProvider>
          <AdoptionProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={Tabs} />
                <Stack.Screen name="AnimalDetails" component={AnimalDetailsScreen} />
              </Stack.Navigator>
              <NewAnimalAlert />
            </NavigationContainer>
          </AdoptionProvider>
        </AnimalsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
