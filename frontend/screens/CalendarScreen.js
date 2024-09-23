import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [headerAnimation] = useState(new Animated.Value(1));

  const animateHeader = () => {
    Animated.timing(headerAnimation, {
      toValue: 0.8,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    animateHeader();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ scale: headerAnimation }] }]}>
        <Text style={styles.title}>Select a Date</Text>
        {selectedDate && <Text style={styles.selectedDate}>Selected: {selectedDate}</Text>}
      </Animated.View>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        minDate={'2023-01-01'}
        maxDate={'2024-12-31'}
        monthFormat={'yyyy MM'}
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#007bff',
            selectedTextColor: '#ffffff',
            marked: true,
            dotColor: '#007bff',
          },
        }}
        markingType={'multi-dot'}
        theme={{
          calendarBackground: '#ffffff',
          dayTextColor: '#333333',
          todayTextColor: '#007bff',
          selectedDayBackgroundColor: '#007bff',
          selectedDayTextColor: '#ffffff',
          arrowColor: '#007bff',
          monthTextColor: '#007bff',
          textSectionTitleColor: '#007bff',
          dotColor: '#007bff',
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => alert('Events for the selected date')}>
        <Icon name="calendar-check" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>View Events</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  selectedDate: {
    fontSize: 18,
    color: '#6c757d',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CalendarScreen;