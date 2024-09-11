import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ConverterScreen from './screens/ConverterScreen';
import ConversionScreen from './screens/ConversionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Converter" component={ConverterScreen} />
        <Stack.Screen name="Conversion" component={ConversionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}