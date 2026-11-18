
import { useCallback, useMemo, useState } from "react";
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

  const login = useCallback((name, email) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem(
      "shopsphere-user",
      JSON.stringify(newUser)
    );
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("shopsphere-user");
  }, []);

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
