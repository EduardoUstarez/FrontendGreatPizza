import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Text, Icon, Button } from "react-native-elements";

import PizzaToppingItem from "../components/PizzaDetail/PizzaToppingItem";

export default function Pizzadetail({ route, navigation }) {
  const { pizzaid } = route.params;
  const [load, setLoad] = useState(true);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    fetch(global.config.url + "GetPizza/" + pizzaid)
      .then((response) => response.json())
      .then(function (data) {
        setDetail(data);
        setLoad(false);
      });
  };

  const deleteToppingFromPizza = async (pizzaid, toppingid) => {
    setLoad(true);

    fetch(global.config.url + "DeleteToppingFromPizza/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pizzaid: pizzaid,
        toppingid: toppingid,
      }),
    })
      .then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          setDetail(data);
          setLoad(false);
        });
      })
      .catch(function (err) {
        console.log("Error : ", err);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
    txtTitle: {
      textAlign: "center",
    },
  });

  return (
    <ScrollView>
      {load ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          <Text style={styles.txtTitle} h1>
            {detail.pizzaDetail.description}
          </Text>
          {detail.pizzaDetail.toppings.map((l, i) => (
            <PizzaToppingItem
              topping={l}
              index={i}
              pizzaid={pizzaid}
              key={l.toppingid}
              deleteToppingFromPizza={deleteToppingFromPizza}
            ></PizzaToppingItem>
          ))}
          <Button
            title="Add Topping"
            onPress={() =>
              navigation.navigate("Toppings", {
                pizzaid: pizzaid,
              })
            }
          />
        </View>
      )}
    </ScrollView>
  );
}
