import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Flag from 'react-native-flags';

const API_KEY = '9456a410c7be3006b596a927';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/history`;

// Helper function to generate date range array between two dates
const generateDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split('T')[0]); // Push date in YYYY-MM-DD format
    currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1
  }

  return dates;
};

// Helper function to fetch historical data for a specific date
const fetchHistoricalData = async (date) => {
  try {
    const response = await fetch(`${BASE_URL}/${date}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error(`Error fetching historical data for ${date}:`, error);
    throw error;
  }
};

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startDate = '2024-09-01';
    const endDate = new Date().toISOString().split('T')[0];

    const getHistoricalData = async () => {
      try {
        const dates = generateDateRange(startDate, endDate); // Generate date range
        const dataPromises = dates.map(date => fetchHistoricalData(date)); // Fetch historical data for each date
        const responses = await Promise.all(dataPromises);

        const formattedData = responses.map((data, index) => ({
          date: dates[index],
          rates: data.rates,
        }));

        setHistory(formattedData);
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    getHistoricalData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Historical Exchange Rates</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <ScrollView>
          {history.map(item => (
            <View key={item.date} style={styles.historyItem}>
              <Text style={styles.date}>Date: {item.date}</Text>
              {Object.entries(item.rates).map(([currency, rate]) => (
                <View key={currency} style={styles.rateItem}>
                  <Flag code={currency} size={24} />
                  <Text style={styles.rateText}>
                    {currency}: {rate}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rateText: {
    fontSize: 16,
  },
});

export default HistoryScreen;