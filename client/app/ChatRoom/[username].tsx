import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import io from 'socket.io-client';


interface Message {
  text: string;
  time: string;
}


const socket = io("http://192.168.1.40:3000");
import { useLocalSearchParams } from 'expo-router';

export default function ChatRoom() {
  const { username } = useLocalSearchParams();
        

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('chat message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg: Message = {
        text: `${username}: ${message}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit('chat message', msg);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBubble}>
            <Text style={styles.messageText}>{msg.text}</Text>
            <Text style={styles.timestamp}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#ccc"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
});
