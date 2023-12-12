import crypto from "crypto";

export const handleTagChange = (e, tags, setTags, setSelectedTag) => {
  const selectedValue = e.target.value;

  if (!tags.includes(selectedValue)) {
    setTags((prevTags) => [...prevTags, selectedValue]);
  }

  setSelectedTag(selectedValue);
};

export const handleAddOrEdit = (
  newItem,
  editingId,
  todos,
  setTodos,
  setEditingId,
  setNewItem,
  setShowInput,
  selectedTag
) => {
  if (!newItem.trim() || newItem.length > 30) return;

  const updatedTodos =
    editingId !== null
      ? todos.map((todo) =>
          todo.id === editingId
            ? { ...todo, title: newItem, tag: selectedTag }
            : todo
        )
      : [
          ...todos,
          {
            id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
            title: newItem,
            completed: false,
            tag: selectedTag,
          },
        ];

  setTodos(updatedTodos);
  setEditingId(null);
  setNewItem("");
  setShowInput(false);
};

export const handleEdit = (
  id,
  todos,
  setNewItem,
  setSelectedTag,
  setEditingId,
  setShowInput
) => {
  const taskToEdit = todos.find((todo) => todo.id === id);
  if (taskToEdit) {
    setNewItem(taskToEdit.title);
    setSelectedTag(taskToEdit.tag);
    setEditingId(id);
    setShowInput(true);
  }
};

export const handleToggleTodo = (id, todos, setTodos) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  setTodos(updatedTodos);
};

export const handleDeleteTag = (tagToDelete, tags, setTags, setSelectedTag) => {
  const updatedTags = tags.filter((tag) => tag !== tagToDelete);
  setTags(updatedTags);
  setSelectedTag(updatedTags[0]);
  localStorage.setItem("tags", JSON.stringify(updatedTags));
};

export const deleteTodo = (id, todos, setTodos) => {
  setTodos(todos.filter((todo) => todo.id !== id));
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

  setTags((prevTags) => {
    const updatedTags = [...prevTags, { tag: tagInput, color: formattedColor }];
    console.log("Updated tags:", updatedTags);

    setTagInput("");
    setDialogOpen(false);
    setDialogKey((prevKey) => prevKey + 1);
    console.log("Tag added successfully.");

    return updatedTags;
  });
};

export const isValidColor = (color) => {
  // Regular expression to check if the color is in the format "#rrggbb"
  const colorRegex = /^#[0-9A-Fa-f]{6}$/;
  return colorRegex.test(color);
};

export const formatColor = (color) => {
  if (isValidColor(color)) {
    return color;
  }

  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  } catch (error) {
    console.error("Error formatting color:", error);
    return "";
  }
};
