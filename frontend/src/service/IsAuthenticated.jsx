import axios from "axios";

const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/auth/authenticateToken",
      { token }
    );

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default isAuthenticated;
