import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  const fetchImage = async () => {
    const randomNumber = generateRandomNumber();
    const image = `https://picsum.photos/200/300?random=${randomNumber}`;
    return image;
  };

  const saveProduct = async (product: Product) => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      products.push(product);
      await AsyncStorage.setItem('products', JSON.stringify(products));
      alert('Producto guardado correctamente');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleAddProduct = async () => {
    const image = await fetchImage();
    const newProduct: Product = {
      id: generateRandomNumber().toString(),
      name,
      price: parseFloat(price),
      description,
      image,
    };
    await saveProduct(newProduct);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Agregar Producto" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    
    color: 'green',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default AddProductScreen;
