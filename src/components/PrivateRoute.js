import { useNavigate } from "react-router-dom";
import { useState } from "react";
const PrivateRoute = ({ Component }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  if(accessToken){
    return Component
  } else{
    navigate("/sign-in")
  }
  
};
export default PrivateRoute;
