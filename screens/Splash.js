import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, ImageBackground } from "react-native";
import { useEffect, useState } from "react";

import * as TodosModel from "../firebase/todosModel";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlicer";
import { addUser } from "../redux/todos/usersSlicer";

export const SplashScreen = ({ navigation }) => {
  //   const navigation = props.nav;
  //   const route = props.route;
  const BGIMG = { uri: "https://i.ibb.co/C1L3wSC/13186366-5125962.jpg" };

  const [userRefID, setUserRefID] = useState({});
  const dispatch = useDispatch();

  const unsuccess = (error) => {
    console.log(`Cannot load data from firebase : ${error}`);
  };

  const success = (doc) => {
    dispatch(
      addTodo({
        id: doc.id,
        task: doc.data().task,
        user_id: userRefID,
      })
    );
  };

  const loadUser2Redux = (doc_ref) => {
    // add user in redux
    dispatch(addUser(doc_ref));
    setUserRefID(doc_ref);
    // get todos where user_refID
    // get TodosByUserRefID(doc_ref,loadTodos2Redux,unsuccess)
    TodosModel.getTodosByUserRefID(doc_ref, success, unsuccess);
  };

  useEffect(() => {
    // TodosModel.getAllTodos(success, unsuccess);
    // TodosModel.getUserByEmail("sophonwit.t@gmail.com",success,unsuccess);
    TodosModel.getUserRefID("sophonwit.t@gmail.com", loadUser2Redux, unsuccess);
    setTimeout(() => {
      navigation.navigate("MainDrawer");
      navigation.reset({ index: 0, routes: [{ name: "MainDrawer" }] });
    }, 2500);
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={BGIMG} resizeMode="cover" style={styles.welcome}>
        <Text style={styles.welcomeText}>I love React-Native</Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "900",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
