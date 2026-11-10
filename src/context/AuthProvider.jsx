
import { useState } from "react";
import { AuthContext } from "./auth-context";

function getSavedUser() {
  try {
    return JSON.parse(
      localStorage.getItem("shopsphere-user") || "null"
    );
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  function login(name, email) {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem(
      "shopsphere-user",
      JSON.stringify(newUser)
    );
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("shopsphere-user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
