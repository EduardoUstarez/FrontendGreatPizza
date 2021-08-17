import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem, Avatar, Button, Icon, Input } from "react-native-elements";

export default function Toppings({ route, navigation }) {
  const { pizzaid } = route.params;
  const [load, setLoad] = useState(true);
  const [toppings, setToppings] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    fetch("http://192.168.0.13/GreatPizza.API/main/GetToppings/")
      .then((response) => response.json())
      .then(function (data) {
        setToppings(data.toppings);
        setLoad(false);
      });
  };

  const deleteTopping = async (e, toppingid) => {
    e.stopPropagation();
    setLoad(true);
    fetch(
      "http://192.168.0.13/GreatPizza.API/main/Deletetopping/" + toppingid,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        setPizzas(data.toppings);
        setLoad(false);
      });
  };

  const addToppingToPizza = async (pizzaid, toppingid) => {
    setLoad(true);

    fetch("http://192.168.0.13/GreatPizza.API/main/AddToppingToPizza", {
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
          setLoad(false);
        });
      })
      .catch(function (err) {
        console.log("Error : ", err);
      });
  };

  const addTopping = async () => {
    setLoad(true);

    fetch("http://192.168.0.13/GreatPizza.API/main/AddTopping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        toppingdescription: text,
      }),
    })
      .then(function (response) {
        response.json().then(function (data) {
          console.log(data);
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
  });

  return (
    <View>
      {load ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View>
          {toppings.map((l, i) => (
            <ListItem
              key={l.toppingid}
              bottomDivider
              onPress={() => {
                addToppingToPizza(pizzaid, l.toppingid);
                navigation.navigate({
                  name: "PizzaDetail",
                  params: { toppingid: l.toppingid, pizzaid: pizzaid },
                  merge: true,
                });
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{l.description}</ListItem.Title>
              </ListItem.Content>
              <Icon
                raised
                name="trash"
                type="font-awesome-5"
                color="#f50"
                onPress={(e) => {
                  deleteTopping(e, l.toppingid);
                }}
              />
            </ListItem>
          ))}

          <Input
            placeholder="Write topping's name"
            onChangeText={(text) => {
              console.log(text);
              setText(text);
            }}
          />

          <Button title="Add Topping" onPress={addTopping} />
        </View>
      )}
    </View>
  );
}
