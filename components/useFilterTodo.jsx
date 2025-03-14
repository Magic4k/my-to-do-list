import { useState } from 'react';

/**
 * Custom Hook: useFilterTodos
 * 
 * This hook provides functionality for filtering a to-do list based on:
 * - Search term
 * - Completed status
 * - Viewing all tasks
 * 
 * @param {Array} todos - The list of to-do items.
 * @param {Function} setTodos - Function to update the todos (not used directly in this hook).
 * @returns {Object} - Contains state variables and functions to manage filtering.
 */
const useFilterTodos = (todos, setTodos) => {
  // State to store the search input value
  const [searchTerm, setSearchTerm] = useState('');

  // State to track whether completed tasks should be displayed
  const [showCompleted, setShowCompleted] = useState(false);

  // State to track whether all tasks should be displayed
  const [showAll, setShowAll] = useState(true);

  /**
   * Updates the search term when the user types in the search box.
   * @param {string} text - The search input value.
   */
  const handleSearchChange = (text) => {
    setSearchTerm(text);
  };

  /**
   * Filters the list to show only completed tasks.
   */
  const handleShowCompleted = () => {
    setShowCompleted(true);
    setShowAll(false); // Ensure only completed tasks are shown
  };

  /**
   * Filters the list to show only non-completed tasks.
   */
  const handleShowNonCompleted = () => {
    setShowCompleted(false);
    setShowAll(false); // Ensure only non-completed tasks are shown
  };

  /**
   * Resets the filter to show all tasks.
   */
  const handleShowAll = () => {
    setShowAll(true);
  };

  /**
   * Filters the to-do list based on the selected criteria.
   * - If `showAll` is true, all tasks are shown.
   * - Otherwise, it filters based on whether tasks are completed or not.
   * - Additionally, it filters tasks based on the search term.
   */
  const filteredTodos = todos
    .filter((todo) => 
      showAll ? true : (showCompleted ? todo.completed : !todo.completed) // Filter by completion status
    )
    .filter((todo) => 
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
    );

  // Return state variables and handlers to be used in components
  return {
    searchTerm,
    showCompleted,
    showAll,
    handleSearchChange,
    handleShowCompleted,
    handleShowNonCompleted,
    handleShowAll,
    filteredTodos,
  };
};

export default useFilterTodos;
