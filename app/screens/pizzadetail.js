import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar, Text, Icon, Button } from "react-native-elements";

export default function Pizzadetail() {
  const list = [
    {
      toppingid: 1,
      description: "Hawaiian",
    },
    {
      toppingid: 2,
      description: "Peperoni",
    },
    {
      toppingid: 3,
      description: "Irish",
    },
  ];

  return (
    <View>
      <Text style={styles.txtTitle} h1>
        Hawaiian
      </Text>
      {list.map((l, i) => (
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
  );
}

const styles = StyleSheet.create({
  txtTitle: {
    textAlign: "center",
  },
});
