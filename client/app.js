import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native";
import { io } from "socket.io-client";
import { isWhiteSpaceLike } from "typescript";

// Replace YOUR_LOCAL_IP below with your actual local IP
const socket = io("http:// 192.168.1.40:3000");

export default function App() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChatMessages((prev) => [...prev, { ...data, received: true }]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    const newMessage = { text: message, time: new Date().toLocaleTimeString() };
    socket.emit("send_message", newMessage);
    setChatMessages((prev) => [...prev, { ...newMessage, received: false }]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={{ color: item.received ? "green" : "blue" }}>
            [{item.time}] {item.text}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ffffff",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
});
