import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | undefined;
  setAuthToken: (token: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const TOKEN_KEY = "AUTH_TOKEN";

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);

  const setAuthToken = (token: string) => {
    if (typeof window !== undefined) {
      localStorage.setItem(TOKEN_KEY, token);
      setToken(token);
    }
  };

  const signOut = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem(TOKEN_KEY);
      setToken(undefined);
      router.reload();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem(TOKEN_KEY);
      if (!!localToken) {
        setToken(localToken);
      } else {
        if (!router.pathname.startsWith("/auth")) {
          router.push("/auth/sign_in");
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setAuthToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
