import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../redux/todos/todosSlicer";
import * as TodosModel from "../../firebase/todosModel";

export const AddScreen = (props) => {
  const navigation = props.nav.navigation;
  //console.log(`navigation: ${navigation.navigate}`)
  // const addTodo = props.addTodo;
  // console.log(`addTodo: ${addTodo}`)
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const [task, setTask] = useState();

  const success = (docRef_id) => {
    //insert task to redux
    dispatch(addTodo({ id: docRef_id, task: task }));
    setTask("");
  };
  const unsuccess = (error) => {
    console.log(`Error ${error}`);
  };

  const onSavePress = () => {
    // addTodo(task);
    // dispatch(addTodo(task));
    // setTask("");
    TodosModel.addTask(task, users, success, unsuccess);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.label}>Task:</Text>
        </View>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.input}
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder="add your task"
            placeholderTextColor="#A0A29D"
          />
        </View>
      </View>
      <View style={{ flex: 3, paddingTop: 50 }}>
        <TouchableOpacity
          style={{ backgroundColor: "#B26B0B", borderRadius: 40 }}
          onPress={onSavePress}
        >
          <Text
            style={[
              styles.label,
              { color: "#fff", fontWeight: "bold", textAlign: "center" },
            ]}
          >
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "gray", borderRadius: 40, marginTop: 30 }}
          onPress={() => {
            navigation.navigate({ name: "Show" });
          }}
        >
          <Text
            style={[
              styles.label,
              { color: "#fff", fontWeight: "bold", textAlign: "center" },
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 40,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2A4602",
    borderRadius: 5,
    alignItems: "stretch",
    paddingLeft: 10,
    fontSize: 40,
    color: "#CB7601",
  },
});
