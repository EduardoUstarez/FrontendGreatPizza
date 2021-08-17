import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Text, Icon, Button } from "react-native-elements";

import ToppingItem from "../components/pizzas/PizzaItem";

export default function Pizzadetail({ route, navigation }) {
  const { pizzaid } = route.params;
  const [load, setLoad] = useState(true);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    let isMounted = true; // note mutable flag

    fetch("http://192.168.0.13/GreatPizza.API/main/GetPizza/" + pizzaid)
      .then((response) => response.json())
      .then(function (data) {
        if (isMounted) {
          setDetail(data);
          setLoad(false);
        }
      });
    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []);

  const loadData = async () => {
    fetch("http://192.168.0.13/GreatPizza.API/main/GetPizza/" + pizzaid)
      .then((response) => response.json())
      .then(function (data) {
        setDetail(data);
        setLoad(false);
      });
  };

  const deleteToppingFromPizza = async (pizzaid, toppingid) => {
    setLoad(true);

    fetch("http://192.168.0.13/GreatPizza.API/main/DeleteToppingFromPizza/", {
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
    <View>
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
            <ToppingItem
              topping={l}
              index={i}
              pizzaid={pizzaid}
              key={l.toppingid}
              deleteToppingFromPizza={deleteToppingFromPizza}
            ></ToppingItem>
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
    </View>
  );
}
