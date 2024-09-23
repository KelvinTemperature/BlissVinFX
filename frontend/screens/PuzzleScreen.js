// screens/PuzzleScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PuzzleScreen = () => {
  const originalWord = 'REACTNATIVE'; // Example word to unscramble
  const [userInput, setUserInput] = useState('');
  const [puzzleDisplay, setPuzzleDisplay] = useState(shuffle(originalWord));

  // Shuffle the letters of the word
  function shuffle(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  }

  const handleCheckAnswer = () => {
    if (userInput.toUpperCase() === originalWord) {
      Alert.alert('Congratulations!', 'You solved the puzzle.');
      setPuzzleDisplay(shuffle(originalWord)); // Set a new shuffled word
      setUserInput('');
    } else {
      Alert.alert('Try Again!', 'The answer is incorrect.');
    }
  };

  const handleReset = () => {
    setPuzzleDisplay(shuffle(originalWord));
    setUserInput('');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwyNzEyNzN8MHwxfGFsbHwxfHx8fHx8fHwxNjcwMTI1NDM5&ixlib=rb-1.2.1&q=80&w=1080' }} // Replace with your background image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.puzzleText}>{puzzleDisplay}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            value={userInput}
            onChangeText={setUserInput}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleCheckAnswer}>
              <Icon name="check" size={20} color="#fff" />
              <Text style={styles.buttonText}>Check Answer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
              <Icon name="restart" size={20} color="#fff" />
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 5, // Shadow radius for iOS
    alignItems: 'center',
  },
  puzzleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PuzzleScreen;