import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem, Avatar, Button, Icon, Input } from "react-native-elements";
import PizzaItem from "../components/pizzas/PizzaItem";

export default function Pizzas({ navigation }) {
  const [load, setLoad] = useState(true);
  const [pizzas, setPizzas] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    fetch(global.config.url + "GetPizzas/")
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setPizzas(data.pizzas);
        setLoad(false);
      });
  };

  const deletePizza = async (e, pizzaid) => {
    e.stopPropagation();
    setLoad(true);
    fetch(global.config.url + "Deletepizza/" + pizzaid, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setPizzas(data.pizzas);
        setLoad(false);
      });
  };

  const addPizza = async () => {
    setLoad(true);

    fetch(global.config.url + "AddPizza/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pizzadescription: text,
      }),
    })
      .then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          setPizzas(data.pizzas);
          setLoad(false);
        });
      })
      .catch(function (err) {
        console.log("Error : ", err);
      });
  };

  return (
    <View>
      {load ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {pizzas.map((l, i) => (
            <PizzaItem
              pizza={l}
              index={i}
              key={l.pizzaid}
              navigation={navigation}
              deletePizza={deletePizza}
            ></PizzaItem>
          ))}

          <Input
            placeholder="Write pizza's name"
            onChangeText={(text) => {
              console.log(text);
              setText(text);
            }}
          />

          <Button title="Add Pizza" onPress={addPizza} />
        </View>
      )}
    </View>
  );
}
