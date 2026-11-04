import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5, AntDesign } from '@expo/vector-icons';
import MapScreen from '../screens/MapScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import NewAnimalScreen from '../screens/NewAnimalScreen';
import NgosScreen from '../screens/NgosScreen';
import AdoptionScreen from '../screens/AdoptionScreen';
import { COLORS } from '../data/constants';
import type { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.accent,
          height: 76,
          paddingTop: 8,
          paddingBottom: 19,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarItemStyle: {
          marginHorizontal: 8,
          marginTop: 2,
          marginBottom: 8,
          borderRadius: 20,
          overflow: 'hidden',
        },
        tabBarActiveBackgroundColor: '#F5B34E',
        tabBarActiveTintColor: '#4A2B12',
        tabBarInactiveTintColor: '#704512',
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,
          tabBarButtonTestID: 'tab-map',
          tabBarAccessibilityLabel: 'Map',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={27} color={color} />,
          tabBarButtonTestID: 'tab-favorites',
          tabBarAccessibilityLabel: 'Favorites',
        }}
      />
      <Tab.Screen
        name="NewAnimal"
        component={NewAnimalScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="plus-square" size={28} color={color} />,
          tabBarButtonTestID: 'tab-new-animal',
          tabBarAccessibilityLabel: 'New animal',
        }}
      />
      <Tab.Screen
        name="Ngos"
        component={NgosScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="paw" size={26} color={color} />,
          tabBarButtonTestID: 'tab-ngos',
          tabBarAccessibilityLabel: 'NGOs',
        }}
      />
      <Tab.Screen
        name="Adoption"
        component={AdoptionScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="hand-holding-heart" size={25} color={color} />,
          tabBarButtonTestID: 'tab-adoption',
          tabBarAccessibilityLabel: 'Adoption',
        }}
      />
    </Tab.Navigator>
  );
}
