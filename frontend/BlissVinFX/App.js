import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ConverterScreen from './screens/ConverterScreen';
import ConversionScreen from './screens/ConversionScreen';
import CandyCrushGameScreen from './screens/CandyCrushGameScreen';
import CurrencyQuestScreen from './screens/CurrencyQuestScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import CalendarScreen from './screens/CalendarScreen';
import BlogScreen from './screens/BlogScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Converter" component={ConverterScreen} />
        <Stack.Screen name="Conversion" component={ConversionScreen} />
        <Stack.Screen name="CandyCrushGame" component={CandyCrushGameScreen} />
        <Stack.Screen name="CurrencyQuest" component={CurrencyQuestScreen} />
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}