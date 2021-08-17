import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Text, Icon, Button } from "react-native-elements";

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
        <View style={styles.container}>
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
