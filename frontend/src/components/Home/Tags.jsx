import React from "react";
import { Chip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Tags({ tags, handleDeleteTag }) {
  return (
    <div>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => handleDeleteTag(tag)}
          color="primary"
          variant="outlined"
          style={{
            margin: "4px",
            background: "#007FFF ",
            color: "white",
            borderColor: "#E25E3E",
          }}
          deleteIcon={<CloseIcon style={{ color: "#C63D2F" }} />}
        />
      ))}
    </div>
  );
}
