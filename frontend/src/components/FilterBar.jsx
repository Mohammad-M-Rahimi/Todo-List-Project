// FilterBar.js
import React from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const filterBarStyle = {
  position: 'absolute',  
  top: '10px',           
  right: '10px',         
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const searchInputStyle = {
  padding: '12px',
  fontSize: '16px',
  marginRight: '10px',
  width: '300px',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none',
};

const searchButtonStyle = {
  backgroundColor: '#0066cc',  // Light blue
  color: '#fff',
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  outline: 'none',
  transition: 'background-color 0.3s ease',
};  

const iconStyle = {
  marginRight: '8px',
};

function FilterBar({ searchTerm, onSearchTermChange, darkMode }) {
  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div style={{ ...filterBarStyle, marginBottom: '100px' }}>
      <div style={searchContainerStyle}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Search"
          style={searchInputStyle}
        />
        <IconButton onClick={handleSearch} style={{ ...searchButtonStyle, ...(darkMode && { backgroundColor: '#0066cc' }) }}>
          <SearchIcon style={iconStyle} /> Search
        </IconButton>
      </div>
    </div>
  );
}

export default FilterBar;
