import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView } from 'react-native';

const CalculatorScreen = () => {
  const [input, setInput] = useState('');
  const [buttonScale] = useState(new Animated.Value(1));

  const handlePress = (value) => {
    setInput((prev) => prev + value);
    animateButton();
  };

  const calculateResult = () => {
    try {
      // Using eval for simplicity; consider using a safe library in production
      const result = eval(input).toString();
      setInput(result);
    } catch (error) {
      setInput('Error');
    }
  };

  const clearInput = () => {
    setInput('');
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const Button = ({ title, onPress, style, isSpecial }) => (
    <TouchableOpacity
      style={[styles.button, style, isSpecial && styles.buttonSpecial]}
      onPress={() => {
        animateButton();
        onPress();
      }}
    >
      <Animated.Text style={[styles.buttonText, isSpecial && styles.buttonTextSpecial]}>
        {title}
      </Animated.Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.result}>{input || '0'}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <Button title="C" onPress={clearInput} isSpecial />
          <Button title="/" onPress={() => handlePress('/')} isSpecial />
          <Button title="*" onPress={() => handlePress('*')} isSpecial />
          <Button title="-" onPress={() => handlePress('-')} isSpecial />
        </View>
        <View style={styles.buttonRow}>
          <Button title="7" onPress={() => handlePress('7')} />
          <Button title="8" onPress={() => handlePress('8')} />
          <Button title="9" onPress={() => handlePress('9')} />
          <Button title="+" onPress={() => handlePress('+')} isSpecial />
        </View>
        <View style={styles.buttonRow}>
          <Button title="4" onPress={() => handlePress('4')} />
          <Button title="5" onPress={() => handlePress('5')} />
          <Button title="6" onPress={() => handlePress('6')} />
          <Button title="=" onPress={calculateResult} isSpecial />
        </View>
        <View style={styles.buttonRow}>
          <Button title="1" onPress={() => handlePress('1')} />
          <Button title="2" onPress={() => handlePress('2')} />
          <Button title="3" onPress={() => handlePress('3')} />
          <Button title="0" onPress={() => handlePress('0')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 20,
  },
  result: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonSpecial: {
    backgroundColor: '#ff5722',
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonTextSpecial: {
    color: '#fff',
    fontSize: 26,
  },
});

export default CalculatorScreen;