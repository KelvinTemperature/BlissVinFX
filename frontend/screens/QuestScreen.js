// QuestScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const questions = [
  // Level 1 (Easy)
  {
    question: 'What is the currency of the United States?',
    options: ['Dollar', 'Euro', 'Yen', 'Pound'],
    answer: 'Dollar',
    difficulty: 1,
  },
  {
    question: 'What is the symbol for the British Pound?',
    options: ['€', '$', '£', '¥'],
    answer: '£',
    difficulty: 1,
  },
  {
    question: 'What currency is used in Japan?',
    options: ['Yen', 'Won', 'Euro', 'Rupee'],
    answer: 'Yen',
    difficulty: 1,
  },
  {
    question: 'What is the currency of Australia?',
    options: ['Dollar', 'Euro', 'Pound', 'Yen'],
    answer: 'Dollar',
    difficulty: 1,
  },
  {
    question: 'Which currency is used in Canada?',
    options: ['Dollar', 'Euro', 'Pound', 'Yen'],
    answer: 'Dollar',
    difficulty: 1,
  },
  {
    question: 'What is the symbol for the Canadian Dollar?',
    options: ['C$', '$', '£', '€'],
    answer: 'C$',
    difficulty: 1,
  },
  {
    question: 'What is the currency of China?',
    options: ['Yuan', 'Dollar', 'Yen', 'Euro'],
    answer: 'Yuan',
    difficulty: 1,
  },
  {
    question: 'What is the currency used in India?',
    options: ['Rupee', 'Dollar', 'Yen', 'Euro'],
    answer: 'Rupee',
    difficulty: 1,
  },
  {
    question: 'Which currency is used in South Africa?',
    options: ['Rand', 'Dollar', 'Euro', 'Pound'],
    answer: 'Rand',
    difficulty: 1,
  },
  {
    question: 'What is the currency of Switzerland?',
    options: ['Swiss Franc', 'Euro', 'Dollar', 'Pound'],
    answer: 'Swiss Franc',
    difficulty: 1,
  },

  // Level 2 (Moderate)
  {
    question: 'Which currency is used in Mexico?',
    options: ['Peso', 'Dollar', 'Euro', 'Real'],
    answer: 'Peso',
    difficulty: 2,
  },
  {
    question: 'What is the symbol for the Indian Rupee?',
    options: ['₹', '$', '€', '¥'],
    answer: '₹',
    difficulty: 2,
  },
  {
    question: 'What currency is used in Brazil?',
    options: ['Real', 'Peso', 'Dollar', 'Euro'],
    answer: 'Real',
    difficulty: 2,
  },
  {
    question: 'Which currency is used in South Korea?',
    options: ['Won', 'Dollar', 'Euro', 'Yen'],
    answer: 'Won',
    difficulty: 2,
  },
  {
    question: 'What is the currency of Turkey?',
    options: ['Lira', 'Euro', 'Dollar', 'Peso'],
    answer: 'Lira',
    difficulty: 2,
  },
  {
    question: 'Which currency is used in New Zealand?',
    options: ['Dollar', 'Euro', 'Yen', 'Pound'],
    answer: 'Dollar',
    difficulty: 2,
  },
  {
    question: 'What is the currency of Norway?',
    options: ['Kroner', 'Euro', 'Dollar', 'Pound'],
    answer: 'Kroner',
    difficulty: 2,
  },
  {
    question: 'What currency is used in Egypt?',
    options: ['Pound', 'Dollar', 'Euro', 'Riyal'],
    answer: 'Pound',
    difficulty: 2,
  },
  {
    question: 'What is the currency of Argentina?',
    options: ['Peso', 'Dollar', 'Euro', 'Real'],
    answer: 'Peso',
    difficulty: 2,
  },
  {
    question: 'Which currency is used in Saudi Arabia?',
    options: ['Riyal', 'Dollar', 'Euro', 'Pound'],
    answer: 'Riyal',
    difficulty: 2,
  },

  // Level 3 (Hard)
  {
    question: 'What currency is used in Kenya?',
    options: ['Shilling', 'Dollar', 'Euro', 'Rupee'],
    answer: 'Shilling',
    difficulty: 3,
  },
  {
    question: 'What is the currency of Indonesia?',
    options: ['Rupiah', 'Dollar', 'Euro', 'Peso'],
    answer: 'Rupiah',
    difficulty: 3,
  },
  {
    question: 'Which currency is used in Malaysia?',
    options: ['Ringgit', 'Dollar', 'Euro', 'Yen'],
    answer: 'Ringgit',
    difficulty: 3,
  },
  {
    question: 'What is the currency of Israel?',
    options: ['Shekel', 'Dollar', 'Euro', 'Pound'],
    answer: 'Shekel',
    difficulty: 3,
  },
  {
    question: 'What currency is used in Vietnam?',
    options: ['Dong', 'Dollar', 'Euro', 'Yen'],
    answer: 'Dong',
    difficulty: 3,
  },
  {
    question: 'Which currency is used in Iran?',
    options: ['Rial', 'Dollar', 'Euro', 'Rupee'],
    answer: 'Rial',
    difficulty: 3,
  },
  {
    question: 'What is the currency of Thailand?',
    options: ['Baht', 'Dollar', 'Euro', 'Yen'],
    answer: 'Baht',
    difficulty: 3,
  },
  {
    question: 'What currency is used in the Philippines?',
    options: ['Peso', 'Dollar', 'Euro', 'Yen'],
    answer: 'Peso',
    difficulty: 3,
  },
  {
    question: 'Which currency is used in Pakistan?',
    options: ['Rupee', 'Dollar', 'Euro', 'Yen'],
    answer: 'Rupee',
    difficulty: 3,
  },
  {
    question: 'What is the currency of Ukraine?',
    options: ['Hryvnia', 'Dollar', 'Euro', 'Pound'],
    answer: 'Hryvnia',
    difficulty: 3,
  },

  // Level 4 (Expert)
  {
    question: 'What currency is used in Iceland?',
    options: ['Icelandic Króna', 'Euro', 'Dollar', 'Pound'],
    answer: 'Icelandic Króna',
    difficulty: 4,
  },
  {
    question: 'What is the currency of Zimbabwe?',
    options: ['Zimbabwean Dollar', 'Peso', 'Euro', 'Yen'],
    answer: 'Zimbabwean Dollar',
    difficulty: 4,
  },
  {
    question: 'Which currency is used in Bhutan?',
    options: ['Ngultrum', 'Dollar', 'Euro', 'Rupee'],
    answer: 'Ngultrum',
    difficulty: 4,
  },
  {
    question: 'What is the currency of Nepal?',
    options: ['Nepalese Rupee', 'Dollar', 'Euro', 'Yen'],
    answer: 'Nepalese Rupee',
    difficulty: 4,
  },
  {
    question: 'What currency is used in Sri Lanka?',
    options: ['Sri Lankan Rupee', 'Dollar', 'Euro', 'Yen'],
    answer: 'Sri Lankan Rupee',
    difficulty: 4,
  },
  {
    question: 'Which currency is used in Laos?',
    options: ['Kip', 'Dollar', 'Euro', 'Yen'],
    answer: 'Kip',
    difficulty: 4,
  },
  {
    question: 'What is the currency of Mongolia?',
    options: ['Tugrik', 'Dollar', 'Euro', 'Yen'],
    answer: 'Tugrik',
    difficulty: 4,
  },
  {
    question: 'What currency is used in Belarus?',
    options: ['Belarusian Ruble', 'Dollar', 'Euro', 'Pound'],
    answer: 'Belarusian Ruble',
    difficulty: 4,
  },
  {
    question: 'What is the currency of Mauritania?',
    options: ['Ouguiya', 'Dollar', 'Euro', 'Pound'],
    answer: 'Ouguiya',
    difficulty: 4,
  },
  {
    question: 'Which currency is used in Timor-Leste?',
    options: ['United States Dollar', 'Euro', 'Peso', 'Yen'],
    answer: 'United States Dollar',
    difficulty: 4,
  },
];

const QuestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(10); // Starting in-game currency
  const [hintUsed, setHintUsed] = useState(false);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    let newScore = score;
    let newCoins = coins;

    if (selectedOption === currentQuestion.answer) {
      newScore += 1;
      newCoins += 5; // Reward for correct answer
      Alert.alert('Correct!', 'Well done, that’s the right answer!');
    } else {
      newCoins -= 3; // Penalty for wrong answer
      Alert.alert('Wrong!', 'Oops, that’s not correct.');
    }

    setScore(newScore);
    setCoins(newCoins);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setHintUsed(false); // Reset hint usage for next question
  };

  const handleHint = () => {
    if (coins >= 5 && !hintUsed) {
      setCoins(coins - 5); // Deduct coins for hint
      setHintUsed(true);
      Alert.alert('Hint', `The correct answer starts with: ${questions[currentQuestionIndex].answer.charAt(0)}`);
    } else if (hintUsed) {
      Alert.alert('Hint Already Used', 'You have already used the hint for this question.');
    } else {
      Alert.alert('Insufficient Coins', 'You need at least 5 coins to use a hint.');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleAnswer(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {questions[currentQuestionIndex]?.question}
      </Text>
      <FlatList
        data={questions[currentQuestionIndex]?.options}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      <View style={styles.footer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.coinsText}>Coins: {coins}</Text>
        <TouchableOpacity style={styles.hintButton} onPress={handleHint}>
          <Ionicons name="help-circle-outline" size={24} color="white" />
          <Text style={styles.hintButtonText}>Hint</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  option: {
    padding: 15,
    backgroundColor: '#007bff',
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  coinsText: {
    fontSize: 18,
    marginBottom: 10,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  hintButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default QuestScreen;