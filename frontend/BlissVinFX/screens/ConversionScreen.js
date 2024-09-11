import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ConversionScreen = ({ route, navigation }) => {
  const { amount, rate } = route.params;
  const convertedAmount = (amount * rate).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversion Result</Text>
      <Text style={styles.result}>Original Amount: ${amount}</Text>
      <Text style={styles.result}>Converted Amount: €{convertedAmount}</Text>
      <Button
        title="Back to Converter"
        onPress={() => navigation.navigate('Converter')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ConversionScreen;