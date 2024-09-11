// CurrencyQuestScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const questions = [
  // Add more questions with different levels and difficulties
  {
    question: 'What is the currency of Japan?',
    options: ['Dollar', 'Yen', 'Euro', 'Rupee'],
    answer: 'Yen',
    difficulty: 1,
  },
  {
    question: 'What is the symbol for the Euro?',
    options: ['$', '£', '€', '¥'],
    answer: '€',
    difficulty: 1,
  },
  {
    question: 'Which country uses the Rupee?',
    options: ['USA', 'India', 'Australia', 'Canada'],
    answer: 'India',
    difficulty: 1,
  },
  {
    question: 'Which currency is represented by the symbol ¥?',
    options: ['Yen', 'Won', 'Rupee', 'Baht'],
    answer: 'Yen',
    difficulty: 2,
  },
  {
    question: 'What is the highest denomination of the US Dollar?',
    options: ['$100', '$1000', '$500', '$50'],
    answer: '$100',
    difficulty: 2,
  },
  // Add more questions with higher difficulties
];

const CurrencyQuestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(10); // Starting in-game currency
  const [hintUsed, setHintUsed] = useState(false);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    let pointsEarned = hintUsed ? 5 : 10; // Reduced points if hint is used

    if (selectedOption === currentQuestion.answer) {
      setScore(score + pointsEarned);
      setCoins(coins + 1); // Reward coins for each correct answer
      Alert.alert('Correct!', `You earned ${pointsEarned} points!`);
    } else {
      Alert.alert('Wrong!', `The correct answer was ${currentQuestion.answer}`);
    }

    // Move to the next question or finish the game
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHintUsed(false); // Reset hint usage for the next question
    } else {
      Alert.alert('Game Over', `You scored ${score + pointsEarned} out of ${questions.length * 10}`);
      // Reset the game
      setCurrentQuestionIndex(0);
      setScore(0);
      setCoins(10); // Reset coins
    }
  };

  const useHint = () => {
    if (coins >= 5) {
      setCoins(coins - 5);
      setHintUsed(true);
      Alert.alert('Hint', `Eliminated one incorrect option.`);
    } else {
      Alert.alert('Not enough coins', 'You need at least 5 coins to use a hint.');
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.optionButton} onPress={() => handleAnswer(item)}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Quest</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <FlatList
        data={currentQuestion.options}
        renderItem={renderOption}
        keyExtractor={(item) => item}
        style={styles.optionsList}
      />
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.coins}>Coins: {coins}</Text>
        <TouchableOpacity style={styles.hintButton} onPress={useHint}>
          <Ionicons name="help-circle-outline" size={24} color="#ffffff" />
          <Text style={styles.hintText}>Use Hint (5 Coins)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'skyblue',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionsList: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  scoreContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
    color: '#007bff',
  },
  coins: {
    fontSize: 18,
    marginBottom: 10,
    color: '#ff9900',
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  hintText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default CurrencyQuestScreen;