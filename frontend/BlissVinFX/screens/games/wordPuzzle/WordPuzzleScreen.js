// src/screens/games/wordPuzzle/WordPuzzleScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';
import words from './assets/words.json'; // Assume words.json is a list of words for the game

const WordPuzzleScreen = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambledWord(scrambleWord(randomWord));
  };

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleGuess = () => {
    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      Alert.alert('Correct!', 'You guessed the word!');
      setScore(score + 10);
      loadNewWord();
    } else {
      Alert.alert('Try Again', 'Incorrect guess, try again!');
    }
    setUserGuess('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word Puzzle Game</Text>
      <Text style={styles.scrambledWord}>{scrambledWord}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your guess"
        value={userGuess}
        onChangeText={setUserGuess}
      />
      <Button title="Submit" onPress={handleGuess} />
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrambledWord: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  score: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default WordPuzzleScreen;