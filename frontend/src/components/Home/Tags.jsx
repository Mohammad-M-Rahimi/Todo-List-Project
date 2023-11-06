import React from "react";
import { Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Tags({ tags, handleDeleteTag }) {
  return (
    <div>
      {tags.map((tag) => (
        <div key={tag} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              border: "2px solid #E25E3E",
              padding: "2px",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="caption">{tag}</Typography>
            <IconButton onClick={() => handleDeleteTag(tag)} color="secondary">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}
