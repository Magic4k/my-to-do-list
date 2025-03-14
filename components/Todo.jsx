import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Todo component that represents a single to-do item
const Todo = ({ todo, onPress, onCheckboxPress, onDelete }) => {
  return (
    // Entire to-do item is wrapped in TouchableOpacity to allow clicking anywhere to trigger onPress
    <TouchableOpacity onPress={() => onPress(todo.id)}>
      <View style={styles.todoContainer}>
        
        {/* Checkbox for marking task as completed */}
        <TouchableOpacity onPress={() => onCheckboxPress(todo.id)}>
          <View
            style={[
              styles.checkbox,
              { backgroundColor: todo.completed ? '#A7D397' : 'transparent' }, // Change background if completed
            ]}
          />
        </TouchableOpacity>

        {/* Container for the task title and description */}
        <View style={styles.textContainer}>
          {/* Title with a strikethrough effect if the task is completed */}
          <Text style={[styles.title, { textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>
            {todo.title}
          </Text>
          {/* Description text */}
          <Text style={styles.description}>{todo.description}</Text>
        </View>

        {/* Delete button to remove the task */}
        <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center', // Align items vertically
    padding: 16, // Space inside each to-do item
    borderBottomWidth: 1, // Add bottom border for separation
    borderBottomColor: '#ccc', // Light grey color for border
  },
  checkbox: {
    width: 20, // Set checkbox size
    height: 20,
    borderRadius: 5, // Rounded corners for checkbox
    borderWidth: 1.5, // Border thickness
    borderColor: '#535C91', // Dark grey border
    marginRight: 16, // Space between checkbox and text
  },
  textContainer: {
    flex: 1, // Allow text container to take available space
  },
  title: {
    fontSize: 18, // Set font size for title
    fontWeight: 'bold', // Make title bold
    color: '#E5C287', // Set title color
  },
  description: {
    marginTop: 8, // Add space between title and description
    color: 'white', // Set text color for description
    fontSize: 18, // Set font size
  },
  deleteButton: {
    backgroundColor: '#D24545', // Red background for delete button
    padding: 8, // Add padding inside button
    borderRadius: 5, // Rounded corners for button
  },
  deleteButtonText: {
    color: '#fff', // White text for delete button
  },
});

// Export the component to be used in other parts of the app
export default Todo;
