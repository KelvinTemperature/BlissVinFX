// HomeScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure you have this library installed

const HomeScreen = ({ navigation }) => {
  // Animation setup
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png.jpg')} // Replace with your logo URL
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome to BlissVinFX!</Text>
      <Text style={styles.description}>
        "Where every exchange is a blessing"
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Converter')}
      >
        <Text style={styles.buttonText}>Currency Converter</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Blog')}
      >
        <Text style={styles.buttonText}>Read Our Blog</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calculator')}
      >
        <Text style={styles.buttonText}>Calculator</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text style={styles.buttonText}>Calendar</Text>
      </TouchableOpacity>

        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('ShootingGame')}
>
  <Text style={styles.buttonText}>Shooting Game</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('WordPuzzle')}
>
  <Text style={styles.buttonText}>Word Puzzle</Text>
</TouchableOpacity>

<TouchableOpacity
          style={styles.animatedButtonContent}
          onPress={() => {
            animateButton();
            navigation.navigate('CurrencyQuest');
          }}
        >
          <Ionicons name="trophy-outline" size={24} color="#ffffff" />
          <Text style={styles.buttonText}>Currency Quest</Text>
        </TouchableOpacity>

      <Animated.View style={[styles.animatedButton, { transform: [{ scale: scaleValue }] }]}>
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light blue background for a fresh look
    padding: 20,
  },
  logo: {
    width: 140,
    height: 120,
    borderRadius: 40,
    marginBottom: 1,
    borderWidth: 2,
    borderColor: '#007bff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 35,
    color: '#00796b',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 10,
    width: '100%',
    marginBottom: 12,
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  animatedButton: {
    marginTop: 25,
  },
  animatedButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5722', // Orange color for the animated button
    padding: 5,
    borderRadius: 10,
    width: '100%',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default HomeScreen;