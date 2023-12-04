const todoItemStyle = {
  base: {
    marginBottom: "10px",
    width: "100%",
    maxWidth: "760px",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
  },
  completed: {
    background: "#ddd",
  },
  container: {
    display: "flex",
    alignItems: "center",
    width: "670px",
  },
  checkbox: {
    color: "inherit",
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    left: "70px",
    "@media (max-width: 760px)": {
      left: 0,
      justifyContent: "flex-end",
      marginTop: "10px",
      width: "100%",
      boxSizing: "border-box",
    },
  },
  actions: {
    marginLeft: "auto",
    display: "flex",
    gap: "10px",
    position: "relative",
    right: "50px",
  },
  completedTodoItem: {
    background: "#ddd",
  },
};

export default todoItemStyle;
