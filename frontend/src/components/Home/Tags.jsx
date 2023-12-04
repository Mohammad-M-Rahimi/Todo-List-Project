// Tags.jsx
import React from 'react';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';

const Tags = ({ tags, handleDeleteTag, insideDialog }) => {
  return (
    <div>
      {tags.map(({ tag, color }) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={insideDialog ? undefined : () => handleDeleteTag(tag)}
          color="primary"
          variant="outlined"
          style={{
            margin: '4px',
            background: color || 'black',
            color: 'white',
            borderColor: '#E25E3E',
          }}
          deleteIcon={
            insideDialog ? null : (
              <CloseIcon
                style={{ color: '#fff' }}
                onClick={() => handleDeleteTag(tag)}
              />
            )
          }
        />
      ))}
    </div>
  );
};

export default Tags;
