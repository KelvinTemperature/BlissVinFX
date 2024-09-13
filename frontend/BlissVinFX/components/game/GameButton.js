// components/GameButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// GameButton component definition
const GameButton = ({ icon, title, onPress, color }) => {
  // Animation value for scaling the button on press
  const scaleValue = new Animated.Value(1);

  // Function to handle button press with animation
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onPress());
  };

  return (
    <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color || '#007bff' }]}
        onPress={animateButton}
        activeOpacity={0.7}
      >
        <View style={styles.contentContainer}>
          <Ionicons name={icon} size={24} color="#ffffff" style={styles.icon} />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Styles for the GameButton component
const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
    width: '90%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4, // Adds a shadow effect
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameButton;