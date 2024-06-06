import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";

interface LoginScreenProps {
  navigation: any; // Aquí puedes especificar el tipo correcto para la navegación
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "12345") {
      alert("Bienvenido!");
      navigation.navigate("Inventory");

    } else if (username === "" || password === "") {
      alert("Por favor, llena todos los campos.");
    } else {
      alert("Las credenciales son incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedorImg}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Image source={require("../images/login.png")} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 10,
  },
  imagen: {
    width: 400,
    height: 200,
  },
  contenedorImg: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    alignContent: "center",
    gap: 10,
  },
});

export default LoginScreen;
