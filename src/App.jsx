import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import { FaLightbulb, FaMoon } from 'react-icons/fa';

export const availableTags = ["Work", "Buy", "Sell", "Meet", "See"];

function App() {
  const [newItem, setNewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('ITEMS')) || []);
  const [editingItem, setEditingItem] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleCheckboxChange = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = (newTodo) => {
    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleEditTodo = (editedTodo) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) =>
    (!searchTerm && !selectedTag) ||
    (todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedTag || todo.tag.toLowerCase() === selectedTag.toLowerCase()))
  );

  const appStyle = {
    textAlign: 'left',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    position: 'relative',
    backgroundColor: darkMode ? '#111' : '#fff',
    color: darkMode ? '#fff' : '#333',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',  // Adjusted to top left
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    fontSize: '2rem',
    marginRight: '10px',
    cursor: 'pointer',
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={appStyle}>
      <div style={buttonContainerStyle}>
        <div
          onClick={toggleDarkMode}
          style={iconStyle}
        >
          {darkMode ? <FaMoon /> : <FaLightbulb />}
        </div>
        <div>
          {darkMode ? "" : ""}
        </div>
      </div>

      <TodoForm
        onAddTodo={handleAddTodo}
        editingItem={editingItem}
        onEditTodo={handleEditTodo}
      />

      <FilterBar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        darkMode={darkMode}
        onFilterClick={() => {
          // Handle filter logic here
          console.log("Filtering tasks");
        }}
      />

      <TodoList
        todos={filteredTodos}
        onCheckboxChange={handleCheckboxChange}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
