// ConverterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ConverterScreen = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);

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
          setConvertedAmount(`${result} ${toCurrency}`);
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
    setConvertedAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currency Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

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

      <Button title="Convert" onPress={handleConvert} />
      <Button title="Reset" onPress={handleReset} color="red" />

      {convertedAmount ? (
        <Text style={styles.result}>Converted Amount: {convertedAmount}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
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
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
});

export default ConverterScreen;