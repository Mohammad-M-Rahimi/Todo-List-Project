// TodoList.js
import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const listItemStyle = (darkMode) => ({
  listStyle: 'none',
  marginBottom: '10px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: darkMode ? '#333333' : ' #f0f0f0', // Adjust background color based on dark mode
  color: darkMode ? '#ffffff' : '#000000', // Adjust text color based on dark mode
});

const iconContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const editIconStyle = {
  cursor: 'pointer',
  marginRight: '5px',
  transition: 'color 0.3s ease',  // Smooth color transition on hover
};

const deleteIconStyle = {
  cursor: 'pointer',
  transition: 'color 0.3s ease',  // Smooth color transition on hover
};

const taskStyle = {
  flex: '1',  // Allow task text to take remaining space
  marginLeft: '10px',
};

const checkboxStyle = {
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '2px solid #4CAF50', // Green color when not checked
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',
};

const checkedStyle = {
  backgroundColor: '#4CAF50', // Green color when checked
  borderRadius: '50%',
};

function TodoList({ todos, onCheckboxChange, onDelete, onEdit, darkMode }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} style={listItemStyle(darkMode)}>
          <div style={iconContainerStyle}>
            <div
              style={{ ...checkboxStyle, ...(todo.completed ? checkedStyle : {}) }}
              onClick={() => onCheckboxChange(todo.id)}
            >
              {todo.completed && <div>&#10003;</div>}
            </div>
            <span style={taskStyle}>{todo.title} - {todo.tag}</span>
          </div>
          <div style={iconContainerStyle}>
            <IconButton
              onClick={() => onEdit(todo)}
              style={editIconStyle}
              onMouseOver={(e) => e.currentTarget.style.color = '#ffa500'}
              onMouseOut={(e) => e.currentTarget.style.color = ''}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDelete(todo.id)}
              style={deleteIconStyle}
              onMouseOver={(e) => e.currentTarget.style.color = '#ff0000'}
              onMouseOut={(e) => e.currentTarget.style.color = ''}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
