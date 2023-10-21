import axios from "axios";

const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/auth/authenticateToken",
      { token }
    );

    if (response.status === 200) {
      console.log("Token validation is successfully completed, Results : Valid");
      return true;
    } else {
      console.error("Response data:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export default isAuthenticated;
