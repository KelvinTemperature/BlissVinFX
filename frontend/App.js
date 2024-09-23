// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ConverterScreen from './screens/ConverterScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import CalendarScreen from './screens/CalendarScreen';
import ResultScreen from './screens/ResultScreen';
import HistoryScreen from './screens/HistoryScreen';
import ChartsScreen from './screens/ChartsScreen';
import PuzzleScreen from './screens/PuzzleScreen'; // Create this screen
import QuestScreen from './screens/QuestScreen'; // Create this screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Converter" component={ConverterScreen} />
        <Stack.Screen name="Calculator" component={CalculatorScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Charts" component={ChartsScreen} />
        <Stack.Screen name="Puzzle" component={PuzzleScreen} />
        <Stack.Screen name="Quest" component={QuestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;