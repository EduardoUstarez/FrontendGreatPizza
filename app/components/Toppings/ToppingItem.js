import React from "react";
import { View } from "react-native";
import { ListItem, Icon } from "react-native-elements";

const ToppingItem = (props) => {
  console.log("PROPS");
  console.log(props);
  const deleteTopping = (e, toppingid) => {
    props.deleteTopping(e, toppingid);
  };

  const addToppingToPizza = (pizzaid, toppingid) => {
    props.addToppingToPizza(pizzaid, toppingid);
  };

  return (
    <View>
      <ListItem
        key={props.topping.toppingid}
        bottomDivider
        onPress={() => {
          addToppingToPizza(props.pizzaid, props.topping.toppingid);
          props.navigation.navigate({
            name: "PizzaDetail",
            params: {
              toppingid: props.topping.toppingid,
              pizzaid: props.pizzaid,
            },
            merge: true,
          });
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{props.topping.description}</ListItem.Title>
        </ListItem.Content>
        <Icon
          raised
          name="trash"
          type="font-awesome-5"
          color="#f50"
          onPress={(e) => {
            deleteTopping(e, props.topping.toppingid);
          }}
        />
      </ListItem>
    </View>
  );
};

export default ToppingItem;
