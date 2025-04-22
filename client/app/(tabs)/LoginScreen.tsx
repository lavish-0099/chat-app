import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim()) {
        router.push({
            pathname: "/ChatRoom/[username]",
            params: { username },
          });
          
    } else {
      Alert.alert('Please enter a username');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your name to join the chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1f1f1f',
    color: 'white',
    padding: 10,
    width: '100%',
    borderRadius: 8,
    marginBottom: 20,
  },
});
