// components/shared/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Button = ({ title, onPress, color = '#007bff', icon, loading = false, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            {icon && <Ionicons name={icon} size={20} color="#fff" style={styles.icon} />}
            <Text style={styles.buttonText}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Button;