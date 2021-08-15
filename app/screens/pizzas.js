import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListItem, Avatar, Button, Icon } from "react-native-elements";

export default function Pizzas({ navigation }) {
  const list = [
    {
      pizzaid: 1,
      description: "Hawaiian",
      subtitle: "Pizza",
    },
    {
      pizzaid: 2,
      description: "Peperoni",
      subtitle: "Pizza",
    },
    {
      pizzaid: 3,
      description: "Irish",
      subtitle: "Pizza",
    },
  ];

  return (
    <View>
      {list.map((l, i) => (
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
  );
}
