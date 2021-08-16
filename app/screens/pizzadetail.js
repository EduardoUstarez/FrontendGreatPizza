import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Text, Icon, Button } from "react-native-elements";

export default function Pizzadetail() {
  const [load, setLoad] = useState(true);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    fetch("http://192.168.0.13/GreatPizza.API/main/GetPizza/1")
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setDetail(data);
        setLoad(false);
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
      padding: 0,
    },
    txtTitle: {
      textAlign: "center",
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
          <Text style={styles.txtTitle} h1>
            {detail.pizzaDetail.description}
          </Text>
          {detail.pizzaDetail.toppings.map((l, i) => (
            <ListItem
              key={l.toppingid}
              bottomDivider
              onPress={() => console.log({ i })}
            >
              <Icon name="dot-circle" type="font-awesome-5" color="#f95" />
              <ListItem.Content>
                <ListItem.Title>{l.description}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
          <Button
            title="Add new Topping"
            onPress={() => navigation.navigate("PizzaDetail")}
          />
        </View>
      )}
    </View>
  );
}
