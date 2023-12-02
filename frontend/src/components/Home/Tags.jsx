// Tags.jsx
import React from "react";
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Tags({ tags, handleDeleteTag, insideDialog }) {
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
            margin: "4px",
            background: color || "black", // Use the tag's color or default to black
            color: "white",
            borderColor: "#E25E3E",
          }}
          deleteIcon={insideDialog ? null : <CloseIcon style={{ color: "#fff" }} />}
        />
      ))}
    </div>
  );
}
