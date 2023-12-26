import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const authToekn = localStorage.getItem('token');
    if (!authToekn) {
      navigate("/");
      return;
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
