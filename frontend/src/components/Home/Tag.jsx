import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";

const Tag = ({ tags, handleDeleteTag, insideDialog }) => {
  // Check if tags is not defined or not an array
  if (!tags || !Array.isArray(tags)) {
    // Return a message or an empty div if tags is not valid
    return <div>No tags available</div>;
  }

  return (
    <div>
      {tags.map(({ tag, color }) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={
            insideDialog ? undefined : () => handleDeleteTag({ tag, color })
          }
          color="primary"
          variant="outlined"
          style={{
            margin: "4px",
            background: color || "black",
            color: "white",
            borderColor: "#E25E3E",
          }}
          deleteIcon={
            insideDialog ? null : (
              <CloseIcon
                style={{ color: "#fff" }}
                onClick={() => handleDeleteTag({ tag, color })}
              />
            )
          }
        />
      ))}
    </div>
  );
};

export default Tag;
