import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem, Avatar, Button, Icon } from "react-native-elements";

export default function Pizzas({ navigation }) {
  const [load, setLoad] = useState();
  const [pizzas, setPizzas] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoad(true);
    fetch("http://192.168.0.13/GreatPizza.API/main/GetPizzas/")
      .then((response) => response.json())
      .then(function (data) {
        setPizzas(data.pizzas);
        setLoad(false);
        console.log(data);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
    },
  });

  return (
    <View>
      {load ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          {pizzas.map((l, i) => (
            <ListItem
              key={l.pizzaid}
              bottomDivider
              onPress={() => console.log({ i })}
            >
              <Icon name="pizza-slice" type="font-awesome-5" color="#f81" />
              <ListItem.Content>
                <ListItem.Title>{l.description}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                raised
                name="trash"
                type="font-awesome-5"
                color="#f50"
                onPress={() => console.log("hello")}
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
