import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from "react-native";

interface HomeScreenProps {
    navigation: any;    
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ scale: scaleValue }] }]}>
        <Text style={styles.title}>Bienvenido a mi Inventario! 😎</Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
