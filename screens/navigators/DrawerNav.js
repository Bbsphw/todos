import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { getHeaderTitle } from "@react-navigation/elements";
import { ShowScreen } from "../todos/ShowScreen";
import { AddScreen } from "../todos/AddScreen";
import { EditScreen } from "../todos/EditScreen";

const WIDTH = Dimensions.get("screen").width;

const CustomHeaderBar = (props) => {
  const { navigation, route, options, layout } = props;
  const title = getHeaderTitle(options, route.name);
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={options.headerStyle}
      >
        <AntDesign
          name="menu"
          size={24}
          color={options.headerTitleStyle.color}
        />

        <Text style={options.headerTitleStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const { navigation, state, descriptors } = props;
  const LOGO = { uri: "https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png" };
  let target = state.routes.find((obj) => {
    return obj.name === "Show";
  });

  let result = descriptors[target.key];
  let width = parseInt(result.options.drawerStyle.width * 0.5);
  let height = width;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={LOGO} style={{ width: width, height: width }} />
      </View>
      <View style={{ flex: 5 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export const DrawerNav = (props) => {
  //console.log(`At DrawerNav addTodo: ${props.addTodo}`)
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Show"
      backBehavior="history"
      screenOptions={{
        headerStyle: styles.headerStyle,
        drawerStyle: styles.drawerStyle,
        headerTitleStyle: styles.headerTitleStyle,
        header: (props) => <CustomHeaderBar {...props} />,
        drawerActiveTintColor: "#447706",
        drawerInactiveTintColor: "#A8A9A6",
        drawerLabelStyle: styles.drawerLabelStyle,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Show"
        component={() => {
          return <ShowScreen todoList={props.todoList} />;
        }}
        options={{
          title: "Show",
          drawerLabel: "Show",
          drawerIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "list-circle" : "list-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Add"
        component={(nav) => {
          //console.log(`Nav:${nav.navigation}`)
          return <AddScreen addTodo={props.addTodo} nav={nav} />;
        }}
        options={{
          title: "Add",
          drawerLabel: "Add",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "text-box-plus" : "text-box-plus-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Edit"
        component={(nav) => {
          return (
            <EditScreen
              todoList={props.todoList}
              editTodo={props.editTodo}
              deleteTodo={props.deleteTodo}
              nav={nav}
            />
          );
        }}
        options={{
          title: "Edit",
          drawerLabel: "Edit",
          drawerIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "content-save-edit" : "content-save-edit-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop:
      Platform.OS === "ios"
        ? StatusBar.currentHeight + 50
        : StatusBar.currentHeight,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A4602",
    paddingVertical: 20,
    paddingLeft: 5,
    borderWidth: 0,
  },
  headerTitleStyle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  drawerStyle: {
    backgroundColor: "#F9FAF7",
    width: parseInt(WIDTH * 0.4),
    height: "100%",
  },
  drawerLabelStyle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#447706",
    size: 30,
  },
});
