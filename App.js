import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TodoList from "./components/TodoList";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const App = () => {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);
  // State to store input values for new todo
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // State to manage the current filter option
  const [filter, setFilter] = useState("all");

  // Initial static todo list
  const staticTodos = [
    { id: 1, title: "Sample Todo 1", description: "Description 1", completed: false },
    { id: 2, title: "Sample Todo 2", description: "Description 2", completed: false },
    { id: 3, title: "Sample Todo 3", description: "Description 3", completed: true },
  ];

  // Effect to set initial todos when component mounts
  useEffect(() => {
    setTodos(staticTodos);
  }, []);

  // Function to add a new todo
  const addTodo = () => {
    if (title && description) {
      const newTodo = {
        id: todos.length + 1,
        title,
        description,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTitle("");
      setDescription("");
    }
  };

  // Function to toggle todo completion status
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Function to delete a todo
  const onDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to filter todos based on the selected filter option
  const filterTodos = (filter) => {
    setFilter(filter);
  };

  // Function to handle checkbox press
  const onCheckboxPress = (id) => {
    toggleTodo(id);
  };

  // Filtering todos based on the selected filter type
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "nonCompleted") return !todo.completed;
    return true;
  });

  return (
    // Dismiss keyboard when tapping outside input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container2}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titles}>Todo App</Text>
          </View>

          <Text style={styles.heading}>Add Todo</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#9290C3"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#9290C3"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, filter === "all" && styles.activeFilter]}
              onPress={() => filterTodos("all")}
            >
              <Text style={styles.filterText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === "completed" && styles.activeFilter]}
              onPress={() => filterTodos("completed")}
            >
              <Text style={styles.filterText}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, filter === "nonCompleted" && styles.activeFilter]}
              onPress={() => filterTodos("nonCompleted")}
            >
              <Text style={styles.filterText}>Non Completed</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heading}>Todos</Text>
          <TodoList
            todos={filteredTodos}
            onPress={toggleTodo}
            onDelete={onDelete}
            onCheckboxPress={onCheckboxPress}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  titles: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#2D3250",
  },
  container2: {
    flex: 1,
    padding: 0,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    color: "white",
    height: 40,
    borderColor: "#424769",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  heading: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#F6B17A",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filterText: {
    color: "gray",
    fontWeight: "bold",
  },
  activeFilter: {
    backgroundColor: "#ddd",
  },
  addButton: {
    backgroundColor: "#9290C3",
    height: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    padding: 4,
    color: "white",
  },
});

export default App;
