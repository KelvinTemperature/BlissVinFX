import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';

const GRID_SIZE = 8;
const ITEM_SIZE = 50;

// Import all fruit images
const fruitImages = {
  apple: require('../assets/apple.png'),
  banana: require('../assets/banana.png'),
  cherry: require('../assets/cherry.png'),
  grape: require('../assets/grape.png'),
  orange: require('../assets/orange.png'),
  strawberry: require('../assets/strawberry.png'),
};

const fruits = ['apple', 'banana', 'cherry', 'grape', 'orange', 'strawberry'];

const generateRandomFruit = () => {
  return fruits[Math.floor(Math.random() * fruits.length)];
};

const createInitialGrid = () => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => generateRandomFruit())
  );
};

const CandyCrushGameScreen = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [goal, setGoal] = useState(1000);
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    // Perform necessary setup if required
  }, []);

  const detectMatches = () => {
    setMultiplier(multiplier + 0.5);
    setScore(score + 100 * multiplier);
    if (score >= goal) {
      setLevel(level + 1);
      setGoal(goal + 1000);
      Alert.alert(`Level Up!`, `Welcome to level ${level + 1}`);
    }
  };

  const swapItems = (row1, col1, row2, col2) => {
    const newGrid = [...grid];
    [newGrid[row1][col1], newGrid[row2][col2]] = [newGrid[row2][col2], newGrid[row1][col1]];
    setGrid(newGrid);
    Animated.timing(Animated.Value(0), {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      detectMatches();
    });
  };

  const renderItem = (fruit, row, col) => {
    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        onPress={() => Alert.alert(`Clicked on ${fruit} at ${row}, ${col}`)}
        style={styles.item}
      >
        <Animated.Image
          source={fruitImages[fruit]} // Use the predefined mapping
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.level}>Level: {level}</Text>
      <Text style={styles.goal}>Goal: {goal}</Text>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((fruit, colIndex) => renderItem(fruit, rowIndex, colIndex))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: GRID_SIZE * ITEM_SIZE,
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  image: {
    width: ITEM_SIZE - 10,
    height: ITEM_SIZE - 10,
  },
  score: {
    fontSize: 24,
    marginBottom: 10,
  },
  level: {
    fontSize: 20,
    marginBottom: 10,
    color: '#007bff',
  },
  goal: {
    fontSize: 16,
    marginBottom: 20,
    color: '#6c757d',
  },
});

export default CandyCrushGameScreen;