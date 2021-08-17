import React from "react";
import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";

const ToppingItem = (props) => {
  const deleteToppingFromPizza = (pizzaid, toppingid) => {
    props.deleteToppingFromPizza(pizzaid, toppingid);
  };

  return (
    <View>
      {" "}
      <ListItem key={props.topping.toppingid} bottomDivider>
        <Icon name="dot-circle" type="font-awesome-5" color="#f95" />
        <ListItem.Content>
          <ListItem.Title>{props.topping.description}</ListItem.Title>
        </ListItem.Content>
        <Icon
          raised
          name="trash"
          type="font-awesome-5"
          color="#f50"
          onPress={(e) => {
            deleteToppingFromPizza(props.pizzaid, props.topping.toppingid);
          }}
        />
      </ListItem>
    </View>
  );
};

export default ToppingItem;
