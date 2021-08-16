import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem, Avatar, Button, Icon } from "react-native-elements";

export default function Pizzas({ navigation }) {
  const [load, setLoad] = useState(true);
  const [pizzas, setPizzas] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    fetch("http://192.168.0.13/GreatPizza.API/main/GetPizzas/")
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setPizzas(data.pizzas);
        setLoad(false);
      });
  };

  const deletePizza = async (e) => {
    e.stopPropagation();
    setLoad(true);
    fetch("http://192.168.0.13/GreatPizza.API/main/Deletepizza/3", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setPizzas(data.pizzas);
        setLoad(false);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
  });

  return (
    <View>
      {load ? (
        <View tyle={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          {pizzas.map((l, i) => (
            <ListItem
              key={l.pizzaid}
              bottomDivider
              onPress={() => {
                navigation.navigate("PizzaDetail", {
                  pizzaid: l.pizzaid,
                });
              }}
            >
              <Icon name="pizza-slice" type="font-awesome-5" color="#f81" />
              <ListItem.Content>
                <ListItem.Title>{l.description}</ListItem.Title>
                <ListItem.Subtitle>Pizza</ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                raised
                name="trash"
                type="font-awesome-5"
                color="#f50"
                onPress={(e) => {
                  deletePizza(e);
                }}
              />
            </ListItem>
          ))}

          <Button
            title="Add new Pizza"
            onPress={() => navigation.navigate("PizzaDetail")}
          />
        </View>
      )}
    </View>
  );
}
