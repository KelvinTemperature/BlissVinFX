// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import ConverterScreen from './screens/ConverterScreen';
import ConversionScreen from './screens/ConversionScreen';
import CurrencyQuestScreen from './screens/CurrencyQuestScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import CalendarScreen from './screens/CalendarScreen';
import BlogScreen from './screens/BlogScreen';

// Import game screens
import ShootingGameScreen from './screens/games/shooting/ShootingGameScreen';
import WordPuzzleScreen from './screens/games/wordPuzzle/WordPuzzleScreen';

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Converter" component={ConverterScreen} />
        <Stack.Screen name="Conversion" component={ConversionScreen} />
        <Stack.Screen name="CurrencyQuest" component={CurrencyQuestScreen} />
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="ShootingGame" component={ShootingGameScreen} />
        <Stack.Screen name="WordPuzzle" component={WordPuzzleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}