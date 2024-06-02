import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthState {
  isAuth: boolean;
  viewer: null;
}

interface AuthContextType extends AuthState {
  signIn: (username: string, password: string) => void;
  signUp: () => void;
  signOut: () => void;
}

const localStorageAuthKey = "isAuth";

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  viewer: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuth: false,
    viewer: null,
  });

  const signIn = (username: string, password: string) => {
    console.log(username, password);
    setAuthState({ isAuth: true, viewer: null });
    localStorage.setItem(localStorageAuthKey, "true");
  };

  const signUp = () => {
    setAuthState({ isAuth: true, viewer: null });
    localStorage.setItem(localStorageAuthKey, "true");
  };

  const signOut = () => {
    setAuthState({ isAuth: false, viewer: null });
    localStorage.removeItem(localStorageAuthKey);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem(localStorageAuthKey);

    if (isAuth) {
      const viewer = null; // request
      setAuthState({ isAuth: true, viewer });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
