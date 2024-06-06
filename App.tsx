import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import InventoryScreen from './screens/InventoryScreen';
import AddProductScreen from './screens/AddProductScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SpeedTestScreen">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}
