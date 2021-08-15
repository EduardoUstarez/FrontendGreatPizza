import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Pizzas({ navigation }) {
  return (
    <View>
      <Text>Pizzas...</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("PizzaDetail")}
      />
    </View>
  );
}
