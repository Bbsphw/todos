import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNav } from "./DrawerNav";
import { SplashScreen } from "../Splash";

export const StackNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainDrawer" component={DrawerNav} />
    </Stack.Navigator>
  );
};
