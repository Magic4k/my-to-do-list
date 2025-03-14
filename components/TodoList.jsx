import React from "react";
import { FlatList, View } from "react-native";
import Todo from "./Todo"; // Importing the Todo component to render individual todo items

// TodoList component that displays a list of todos
const TodoList = ({ todos, onPress, onCheckboxPress, onDelete }) => {
  return (
    <View>
      {/* FlatList is used for efficiently rendering large lists */}
      <FlatList
        data={todos} // The list of todos passed as a prop
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        } // Ensures each item has a unique key, using its ID or generating a random one
        renderItem={({ item }) => (
          <Todo
            todo={item} // Passing the current todo item to the Todo component
            onPress={onPress} // Function to toggle todo completion
            onCheckboxPress={onCheckboxPress} // Function to handle checkbox press
            onDelete={onDelete} // Function to delete a todo
          />
        )}
      />
    </View>
  );
};

export default TodoList; // Exporting the component for use in other parts of the app
