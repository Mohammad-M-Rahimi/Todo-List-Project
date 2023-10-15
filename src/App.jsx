import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

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
    textAlign: 'left',  // Align content to the left
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    position: 'relative',
    backgroundColor: darkMode ? '#333333' : '#f0f0f0',
    color: darkMode ? '#ffffff' : '#000000',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: darkMode ? '#ffffff' : '#000000',
    transition: 'color 0.3s ease-in-out',
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={appStyle}>
      <div style={buttonContainerStyle}>
        <button
          onClick={toggleDarkMode}
          style={{ ...buttonStyle, ...(darkMode && { color: '#ffff' }) }}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
      </div>

      <h1 style={{ color: '#0066cc', textAlign: 'left' }}>Todo List</h1>

      {/* Move TodoForm to the left */}
      <div style={{ marginLeft: '10px' }}>
        <TodoForm
          onAddTodo={handleAddTodo}
          editingItem={editingItem}
          onEditTodo={handleEditTodo}
        />

        {/* Move FilterBar to the left */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          darkMode={darkMode}
        />

        {/* Move the TodoList header and tag selector to the left */}
        <h2 style={{ color: '#0066cc' }}>My Tasks</h2>
        <label htmlFor="tagSelector">Select Tag:</label>
        <select
          id="tagSelector"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

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
