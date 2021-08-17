import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem, Avatar, Button, Icon, Input } from "react-native-elements";

import ToppingItem from "../components/Toppings/ToppingItem";

export default function Toppings({ route, navigation }) {
  const { pizzaid } = route.params;
  const [load, setLoad] = useState(true);
  const [toppings, setToppings] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    fetch(global.config.url + "GetToppings/")
      .then((response) => response.json())
      .then(function (data) {
        setToppings(data.toppings);
        setLoad(false);
      });
  };

  const deleteTopping = async (e, toppingid) => {
    e.stopPropagation();
    setLoad(true);
    fetch(global.config.url + "Deletetopping/" + toppingid, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        if (data.correct) {
          setToppings(data.toppings);
          setLoad(false);
        } else {
          //Manage error
        }
      });
  };

  const addToppingToPizza = async (pizzaid, toppingid) => {
    setLoad(true);

    fetch(global.config.url + "AddToppingToPizza/", {
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

    fetch(global.config.url + "AddTopping/", {
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
          if (data.correct) {
            setToppings(data.toppings);
          } else {
            //Manage error
          }

          setLoad(false);
        });
      })
      .catch(function (err) {
        console.log("Error : ", err);
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
    <ScrollView>
      {load ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          {toppings.map((l, i) => (
            <ToppingItem
              topping={l}
              index={i}
              pizzaid={pizzaid}
              key={l.toppingid}
              navigation={navigation}
              deleteTopping={deleteTopping}
              addToppingToPizza={addToppingToPizza}
            ></ToppingItem>
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
    </ScrollView>
  );
}
