// navigation/StackNavigator.js or wherever you define your navigator
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ConverterScreen from '../screens/ConverterScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ChartsScreen from '../screens/ChartsScreen';
import PuzzleScreen from '../screens/PuzzleScreen';
import QuestScreen from '../screens/QuestScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CalculatorScreen from '../screens/CalculatorScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Converter" component={ConverterScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Charts" component={ChartsScreen} />
      <Stack.Screen name="Puzzle" component={PuzzleScreen} />
      <Stack.Screen name="Quest" component={QuestScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;