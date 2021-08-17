import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pizzas from "../screens/pizzas";
import Pizzadetail from "../screens/pizzadetail";
import Toppings from "../screens/toppings";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pizzas"
          component={Pizzas}
          options={{ title: "List of Pizzas" }}
        />
        <Stack.Screen
          name="PizzaDetail"
          component={Pizzadetail}
          options={{ title: "Detail of the Pizza" }}
        />
        <Stack.Screen
          name="Toppings"
          component={Toppings}
          options={{ title: "List of toppings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
