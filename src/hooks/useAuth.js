import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    } catch (err) {
      console.error("Auth hook error:", err);
    }
  }, []);

  return { isLoggedIn, setIsLoggedIn };
}
