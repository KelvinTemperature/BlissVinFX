// src/navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ConverterScreen from '../screens/ConverterScreen';
import CalculatorScreen from '../screens/CalculatorScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ShootingGameScreen from '../screens/games/shooting/ShootingGameScreen';
import WordPuzzleScreen from '../screens/games/wordPuzzle/WordPuzzleScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Converter" component={ConverterScreen} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="ShootingGame" component={ShootingGameScreen} />
      <Stack.Screen name="WordPuzzle" component={WordPuzzleScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;