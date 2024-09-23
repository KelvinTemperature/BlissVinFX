import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Animation value for text movement
  const translateX = useRef(new Animated.Value(0)).current; 
  
  // State for alternating messages
  const [currentMessage, setCurrentMessage] = useState('Welcome to BlissVinFX'); 

  useEffect(() => {
    // Animation loop for text movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 100, // Move the text 100 pixels to the right
          duration: 2000, // 2 seconds
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0, // Move the text back to the start
          duration: 2000, // 2 seconds
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Alternating between two messages with a delay
    const messageInterval = setInterval(() => {
      setCurrentMessage((prevMessage) =>
        prevMessage === 'Welcome to BlissVinFX'
          ? 'Where every exchange is a blessing'
          : 'Welcome to BlissVinFX'
      );
    }, 4000); // Switch message every 4 seconds

    return () => clearInterval(messageInterval); // Clear interval on component unmount
  }, [translateX]);

  return (
    <ImageBackground
    source={require('../assets/background.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* Animated header title with alternating messages */}
        <Animated.Text style={[styles.title, { transform: [{ translateX }] }]}>
          {currentMessage}
        </Animated.Text>

        <View style={styles.content}>
          {/* Add the logo at the top */}
          <Image
            source={require('../assets/logo.png')} // Update the path to your logo
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Currency Converter */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Converter')}
          >
            <Icon name="currency-usd" size={24} color="#fff" />
            <Text style={styles.buttonText}>Currency Converter</Text>
          </TouchableOpacity>

          {/* Historical Data */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('History')}
          >
            <Icon name="calendar" size={24} color="#fff" />
            <Text style={styles.buttonText}>Historical Data</Text>
          </TouchableOpacity>

          {/* Charts */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Charts')}
          >
            <Icon name="chart-line" size={24} color="#fff" />
            <Text style={styles.buttonText}>Charts</Text>
          </TouchableOpacity>

          {/* Word Puzzle Game */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Puzzle')}
          >
            <Icon name="puzzle" size={24} color="#fff" />
            <Text style={styles.buttonText}>Word Puzzle Game</Text>
          </TouchableOpacity>

          {/* Currency Quest */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Quest')}
          >
            <Icon name="map" size={24} color="#fff" />
            <Text style={styles.buttonText}>Currency Quest</Text>
          </TouchableOpacity>

          {/* Calendar */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Calendar')}
          >
            <Icon name="calendar-month" size={24} color="#fff" />
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>

          {/* Calculator */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Calculator')}
          >
            <Icon name="calculator" size={24} color="#fff" />
            <Text style={styles.buttonText}>Calculator</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight dark overlay to make text and buttons more readable
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#007bff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;