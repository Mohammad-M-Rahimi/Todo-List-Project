import crypto from "crypto";

export const handleDeleteTag = (tags, setTags, tagToDelete) => {
  const updatedTags = tags.filter((tag) => tag.tag !== tagToDelete);
  setTags(updatedTags);
  localStorage.setItem("tags", JSON.stringify(updatedTags));
};

export const toggleTodo = (id, setTodos, todos) => {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};

export const deleteTodo = (id, setTodos, todos) =>
  setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));

export const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const handsubmit = (e, setTodos, setNewItem, newItem) => {
  e.preventDefault();
  setTodos((currentTodos) => [
    ...currentTodos,
    { id: crypto.randomUUID(), title: newItem, completed: false },
  ]);
  setNewItem("");
};

export const handleAddTag = (
  tagInput,
  selectedColor,
  setTagInput,
  setDialogOpen,
  setTags,
  tags,
  setDialogKey
) => {
  console.log("Adding tag:", tagInput, selectedColor);

  if (tagInput.trim() === "" || !isValidColor(selectedColor)) {
    console.log("Invalid tag input or color format.");
    return;
  }

  // Ensure selectedColor is in the format "#rrggbb"
  const formattedColor = formatColor(selectedColor);

  const updatedTags = [...tags, { tag: tagInput, color: formattedColor }];
  console.log("Updated tags:", updatedTags);

  setTags(updatedTags);
  localStorage.setItem("tags", JSON.stringify(updatedTags));
  setTagInput("");
  setDialogOpen(false);
  setDialogKey((prevKey) => prevKey + 1);
  console.log("Tag added successfully.");
};

export const isValidColor = (color) => {
  // Regular expression to check if the color is in the format "#rrggbb"
  const colorRegex = /^#[0-9A-Fa-f]{6}$/;
  return colorRegex.test(color);
};

export const formatColor = (color) => {
  // If the color is already in the correct format, return it
  if (isValidColor(color)) {
    return color;
  }

  // Otherwise, try to convert the color to the format "#rrggbb"
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  } catch (error) {
    console.error("Error formatting color:", error);
    return "";
  }
};
