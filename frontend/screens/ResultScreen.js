import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResultScreen = ({ route }) => {
  const { convertedAmount, fromCurrency, toCurrency } = route.params;
  const navigation = useNavigation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBack = () => {
    navigation.navigate('Converter');
  };

  return (
    <ImageBackground
    source={require('../assets/converterbackground.png')}
      style={styles.background}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Conversion Result</Text>
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            {convertedAmount} {toCurrency}
          </Text>
          <Text style={styles.infoText}>
            Converted from {fromCurrency} to {toCurrency}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.buttonText}>Back to Converter</Text>
        </TouchableOpacity>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for better readability
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  resultBox: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f8ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  resultText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ResultScreen;