import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { Audio } from 'expo-av';

const GRID_SIZE = 8;
const ITEM_SIZE = 40; // Size of each grid item
const COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
const SPECIAL_COLOR = 'rainbow';
const MATCH_LENGTH = 3;
const LEVEL_UP_THRESHOLD = 100; // Example threshold to increase level

const generateGrid = () => {
  let grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    grid.push([]);
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i].push(Math.random() < 0.05 ? SPECIAL_COLOR : COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
  }
  return grid;
};

const CandyCrushGameScreen = () => {
  const [grid, setGrid] = useState(generateGrid());
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [animation] = useState(new Animated.Value(0));
  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sound/swap.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  const checkMatches = (newGrid) => {
    let matches = [];
    // Check rows for matches
    for (let row = 0; row < GRID_SIZE; row++) {
      let match = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        if (match.length === 0 || newGrid[row][col] === newGrid[row][col - 1]) {
          match.push({ row, col });
        } else {
          if (match.length >= MATCH_LENGTH) matches.push(match);
          match = [{ row, col }];
        }
      }
      if (match.length >= MATCH_LENGTH) matches.push(match);
    }

    // Check columns for matches
    for (let col = 0; col < GRID_SIZE; col++) {
      let match = [];
      for (let row = 0; row < GRID_SIZE; row++) {
        if (match.length === 0 || newGrid[row][col] === newGrid[row - 1][col]) {
          match.push({ row, col });
        } else {
          if (match.length >= MATCH_LENGTH) matches.push(match);
          match = [{ row, col }];
        }
      }
      if (match.length >= MATCH_LENGTH) matches.push(match);
    }

    // Handle special items and remove matched items
    if (matches.length > 0) {
      const updatedGrid = [...newGrid];
      matches.forEach(match => {
        match.forEach(({ row, col }) => {
          updatedGrid[row][col] = null;
        });
      });
      collapseGrid(updatedGrid);
      return matches.length * 10; // Example score increment
    }
    return 0;
  };

  const collapseGrid = (grid) => {
    // Collapse logic to fill empty spaces
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptySpaces = 0;
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (grid[row][col] === null) {
          emptySpaces++;
        } else if (emptySpaces > 0) {
          grid[row + emptySpaces][col] = grid[row][col];
          grid[row][col] = null;
        }
      }
      for (let i = 0; i < emptySpaces; i++) {
        grid[i][col] = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
    }
    setGrid([...grid]);
  };

  const handlePress = (row, col) => {
    if (selected) {
      // Swap logic
      const newGrid = [...grid];
      const [selectedRow, selectedCol] = selected;
      const temp = newGrid[row][col];
      newGrid[row][col] = newGrid[selectedRow][selectedCol];
      newGrid[selectedRow][selectedCol] = temp;

      // Animation
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();

      playSound();

      const points = checkMatches(newGrid);
      if (points > 0) {
        setScore(score + points);
        Alert.alert('Match Found!', `You earned ${points} points!`);
        if (score + points >= LEVEL_UP_THRESHOLD) {
          increaseLevel();
        }
      }
      setGrid(newGrid);
      setSelected(null);
    } else {
      setSelected([row, col]);
    }
  };

  const increaseLevel = () => {
    setLevel(level + 1);
    // Update grid or add new features for the next level
    Alert.alert('Level Up!', `You are now on Level ${level + 1}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.level}>Level: {level}</Text>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((color, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[styles.item, { backgroundColor: color || 'white' }]}
              onPress={() => handlePress(rowIndex, colIndex)}
            >
              <Animated.View style={{ opacity: animation }}>
                <View style={[styles.item, { backgroundColor: color || 'white' }]} />
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <Text style={styles.instructions}>
        Tap to select and swap items. Matches will clear them!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 1,
    borderRadius: 5,
  },
  instructions: {
    marginTop: 20,
    fontSize: 18,
    color: '#6c757d',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  level: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CandyCrushGameScreen;