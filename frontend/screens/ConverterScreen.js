import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Flag from 'react-native-flags'; // Import the flag component

const ConverterScreen = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const navigation = useNavigation();

  const API_KEY = '9456a410c7be3006b596a927'; // Replace with your API key
  const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

  useEffect(() => {
    // Fetch available currencies
    fetch(`${BASE_URL}/latest/USD`)
      .then(response => response.json())
      .then(data => {
        const currencyCodes = Object.keys(data.conversion_rates);
        setCurrencies(currencyCodes);
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch currency codes.');
      });
  }, []);

  const handleConvert = () => {
    if (!amount || !fromCurrency || !toCurrency) {
      Alert.alert('Error', 'Please enter an amount and select currencies.');
      return;
    }

    fetch(`${BASE_URL}/latest/${fromCurrency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.conversion_rates[toCurrency];
        if (rate) {
          const result = (amount * rate).toFixed(2);
          navigation.navigate('Result', { convertedAmount: `${result} ${toCurrency}` });
        } else {
          Alert.alert('Error', 'Conversion rate not available.');
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch conversion rates.');
      });
  };

  const handleReset = () => {
    setAmount('');
    setFromCurrency('');
    setToCurrency('');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwyNzEyNzN8MHwxfGFsbHwxfHx8fHx8fHwxNjcwMTI1NDM5&ixlib=rb-1.2.1&q=80&w=1080' }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={fromCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setFromCurrency(itemValue)}
          >
            <Picker.Item label="Select From Currency" value="" />
            {currencies.map(currency => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={toCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setToCurrency(itemValue)}
          >
            <Picker.Item label="Select To Currency" value="" />
            {currencies.map(currency => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleConvert}>
            <Icon name="currency-usd" size={20} color="#fff" />
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
            <Icon name="restart" size={20} color="#fff" />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Display the selected currencies with flags */}
        {fromCurrency && toCurrency && (
          <View style={styles.selectedCurrencies}>
            <Text style={styles.selectedText}>
              From: <Flag code={fromCurrency} size={24} /> {fromCurrency}
            </Text>
            <Text style={styles.selectedText}>
              To: <Flag code={toCurrency} size={24} /> {toCurrency}
            </Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  selectedCurrencies: {
    marginTop: 20,
  },
  selectedText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
  },
});

export default ConverterScreen;