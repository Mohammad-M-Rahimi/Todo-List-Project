// styles.js
const styles = {
  todoItem: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    height: "70px",
    width: "650px",
  },
  completedTodoItem: {
    textDecoration: "line-through",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  modalContent: {
    background: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },
};

export default styles;
