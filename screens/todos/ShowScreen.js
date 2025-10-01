import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSelector } from "react-redux";

const ShowItem = ({ item, backgroundColor, textColor, onItemPress }) => {
  return (
    <TouchableOpacity
      style={{ margin: 10, backgroundColor }}
      onPress={onItemPress}
    >
      <Text
        style={[
          styles.bigText,
          { color: textColor, paddingVertical: 10, paddingLeft: 10 },
        ]}
      >
        {item.task}
      </Text>
    </TouchableOpacity>
  );
};

export const ShowScreen = (props) => {
  //console.log(`Showscreen ${props.todoList}`)
  const todoList = useSelector((state) => state.todos);

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? "#BEC1BA" : "#fff";
    const textColor = item.id === selectedId ? "#447706" : "#B26B0B";
    return (
      <ShowItem
        style={{ flex: 1 }}
        item={item}
        key={index}
        backgroundColor={backgroundColor}
        textColor={textColor}
        onItemPress={() => setSelectedId(item.id)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
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
    color: "#B26B0B",
  },
});
