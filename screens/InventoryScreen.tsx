import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const InventoryScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?sort=asc"
        );
        const storedProducts = await AsyncStorage.getItem("products");
        const localProducts = storedProducts ? JSON.parse(storedProducts) : [];
        setProducts([...response.data, ...localProducts]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const loadLocalProducts = async () => {
      const storedProducts = await AsyncStorage.getItem("products");
      if (storedProducts) {
        setProducts((prevProducts) => {
          const parsedProducts = JSON.parse(storedProducts);
          const filteredProducts = prevProducts.filter(
            (p) => !parsedProducts.some((lp: Product) => lp.id === p.id)
          );
          return [...filteredProducts, ...parsedProducts];
        });
      }
    };

    const unsubscribe = navigation.addListener("focus", loadLocalProducts);
    return unsubscribe;
  }, [navigation]);

  const deleteProduct = async (productId: string) => {
    try {
      const storedProducts = await AsyncStorage.getItem("products");
      let products = storedProducts ? JSON.parse(storedProducts) : [];
      products = products.filter(
        (product: Product) => product.id !== productId
      );
      await AsyncStorage.setItem("products", JSON.stringify(products));
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Precio: ${item.price}</Text>
        <Text style={styles.description}>
          {item.description.substring(0, 70)}
        </Text>
        <View style={styles.eliminar}>
          <Button title="Eliminar" onPress={() => deleteProduct(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View>
        <Button
          title="Agregar Producto"
          onPress={() => navigation.navigate("AddProduct")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  eliminar: {
    backgroundColor: '#C0C0C0',
    borderRadius: 10,  
  },
});

export default InventoryScreen;
