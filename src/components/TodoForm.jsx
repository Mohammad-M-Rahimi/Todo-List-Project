// TodoForm.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { availableTags } from '../App';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const formStyle = {
  margin: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  padding: '12px',
  fontSize: '16px',
  marginBottom: '10px',
  width: '300px',  // Set the width to be the same as the select tag
  boxSizing: 'border-box',  // Include padding and border in the total width
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none',
};

const selectStyle = {
  padding: '12px',
  fontSize: '16px',
  marginBottom: '10px',
  width: '300px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none',
};

const addButtonStyle = {
  backgroundColor: '#0066cc',  // Light blue
  color: '#fff',
  padding: '12px',
  fontSize: '16px',
  width: '300px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  outline: 'none',
  transition: 'background-color 0.3s ease',
};

const iconStyle = {
  marginRight: '8px',
};

function TodoForm({ onAddTodo, editingItem, onEditTodo }) {
  const [newItem, setNewItem] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (editingItem !== null) {
      setNewItem(editingItem.title || "");
      setSelectedTag(editingItem.tag);
    } else {
      setNewItem("");
      setSelectedTag("");
    }
  }, [editingItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem || !selectedTag) {
      console.log("Please enter a title and select a tag");
      return;
    }

    if (editingItem) {
      onEditTodo({
        ...editingItem,
        title: newItem,
        tag: selectedTag,
      });
    } else {
      onAddTodo({
        id: uuidv4(),
        title: newItem,
        completed: false,
        tag: selectedTag,
      });
    }

    setNewItem("");
    setSelectedTag("");
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New Item"
        style={inputStyle}
      />

      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        style={selectStyle}
      >
        <option value="">Select a Tag</option>
        {availableTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <IconButton onClick={handleSubmit} style={addButtonStyle}>
        <AddIcon style={iconStyle} /> {editingItem ? 'Edit' : 'Add'}
      </IconButton>
    </form>
  );
}

export default TodoForm;
