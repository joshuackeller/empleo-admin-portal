import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | undefined;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const TOKEN_KEY = "AUTH_TOKEN";

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const router = useRouter();

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
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
