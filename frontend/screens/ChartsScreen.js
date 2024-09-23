// screens/ChartsScreen.js
import React from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const ChartsScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  // Dummy data for Line Chart with Naira included, extended to September
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'], // All months until September
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 60, 75, 90], // Generic currency growth
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [15, 30, 25, 70, 80, 35, 50, 65, 85], // Naira data up to September
        color: (opacity = 1) => `rgba(0, 204, 102, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Currency Growth Over Months', 'Naira (NGN)'], // optional
  };

  // Dummy data for Bar Chart with Naira included
  const barData = {
    labels: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'NGN'],
    datasets: [
      {
        data: [30, 40, 45, 50, 60, 70, 65], // Naira rate added
      },
    ],
  };

  // Dummy data for Pie Chart with Naira included
  const pieData = [
    {
      name: 'USD',
      population: 40,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'EUR',
      population: 30,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'GBP',
      population: 20,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'JPY',
      population: 10,
      color: 'rgba(0, 255, 0, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'NGN', // Adding Naira to Pie chart
      population: 50,
      color: 'rgba(0, 204, 102, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Currency Trends</Text>

      {/* Line Chart */}
      <Text style={styles.chartTitle}>Line Chart - Currency Growth </Text>
      <LineChart
        data={lineData}
        width={screenWidth - 20} // from react-native
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Bar Chart - Exchange Rates </Text>
      <BarChart
        data={barData}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Pie Chart */}
      <Text style={styles.chartTitle}>Pie Chart - Currency Distribution </Text>
      <PieChart
        data={pieData}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default ChartsScreen;