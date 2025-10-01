import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

import { useSelector, useDispatch } from "react-redux";
import { editTodo, deleteTodo } from "../../redux/todos/todosSlicer";

const ShowItem = ({
  item,
  backgroundColor,
  textColor,
  setSelectedId,
  deleteTodo,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={{ margin: 10, backgroundColor }}>
      <Text style={[styles.bigText, { color: textColor, paddingVertical: 10 }]}>
        {item.task}
      </Text>

      <View style={{ flexDirection: "row", position: "absolute", right: 0 }}>
        <TouchableOpacity
          style={[styles.textLine, { backgroundColor }]}
          onPress={() => setSelectedId(item.id)}
        >
          <Feather name="edit-3" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.textLine, { backgroundColor }]}
          onPress={() => dispatch(deleteTodo(item.id))}
        >
          <Feather name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EditItem = ({ item, backgroundColor, textColor, setSelectedId }) => {
  const [newTask, setNewTask] = useState(item.task);
  const dispatch = useDispatch();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TextInput
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
        style={[
          { borderWidth: 1, backgroundColor, borderRadius: 10 },
          styles.bigText,
          styles.container,
        ]}
      />
      <TouchableOpacity
        onPress={() => {
          // editTodo(item.id, newTask)
          dispatch(
            editTodo({
              id: item.id,
              task: newTask,
            })
          );
          setSelectedId(null);
        }}
      >
        <Feather name="save" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export const EditScreen = (props) => {
  const navigation = props.nav.navigation;
  //console.log(`navigation: ${navigation.navigate}`)

  //An array below will be changed from local state to global state and also slicers
  // const todoList = props.todoList;
  const todoList = useSelector((state) => state.todos);
  // const editTodo = props.editTodo;
  // const deleteTodo = props.deleteTodo;
  // console.log(`Editscreen ${props.todoList}`);

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    //console.log(selectedId)
    const backgroundColor = item.id === selectedId ? "#BEC1BA" : "#fff";
    const textColor = item.id === selectedId ? "#447706" : "#B26B0B";
    return item.id !== selectedId ? (
      <ShowItem
        item={item}
        key={index}
        backgroundColor={backgroundColor}
        textColor={textColor}
        setSelectedId={setSelectedId}
        // deleteTodo={deleteTodo}
      />
    ) : (
      <EditItem
        item={item}
        key={index}
        onItemPress={() => setSelectedId(item.id)}
        editTodo={editTodo}
        backgroundColor={backgroundColor}
        textColor={textColor}
        setSelectedId={setSelectedId}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ flex: 6 }}
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "lightgray",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.navigate({ name: "Show" });
        }}
      >
        <Text style={styles.bigText}>Go to show</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bigText: {
    fontSize: 30,
    color: "#365A04",
  },
  textLine: {
    padding: 10,
    margin: 10,
  },
});
