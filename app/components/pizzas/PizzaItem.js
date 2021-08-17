import React from "react";
import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";

const PizzaItem = (props) => {
  const deletePizza = (e, pizzaid) => {
    props.deletePizza(e, pizzaid);
  };

  return (
    <View>
      {" "}
      <ListItem
        key={props.pizza.pizzaid}
        bottomDivider
        onPress={() => {
          props.navigation.navigate("PizzaDetail", {
            pizzaid: props.pizza.pizzaid,
          });
        }}
      >
        <Icon name="pizza-slice" type="font-awesome-5" color="#f81" />
        <ListItem.Content>
          <ListItem.Title>{props.pizza.description}</ListItem.Title>
          <ListItem.Subtitle>Pizza</ListItem.Subtitle>
        </ListItem.Content>
        <Icon
          raised
          name="trash"
          type="font-awesome-5"
          color="#f50"
          onPress={(e) => {
            deletePizza(e, props.pizza.pizzaid);
          }}
        />
      </ListItem>
    </View>
  );
};

export default PizzaItem;
