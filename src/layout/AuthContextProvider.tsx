import { useRouter } from "next/router";
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | undefined;
  setAuthToken: (token: string) => void;
  signOut: () => void;
  organizationId: string | undefined;
  selectOrganization: (organizationId: string) => void;
  exitOrganization: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const TOKEN_KEY = "AUTH_TOKEN";
export const ORGANIZATION_ID_KEY = "ORGANIZATION_ID";

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [organizationId, setOrganizationId] = useState<string | undefined>(
    undefined
  );

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
      exitOrganization();
      router.reload();
    }
  };

  const selectOrganization = (organizationId: string) => {
    if (typeof window !== undefined) {
      localStorage.setItem(ORGANIZATION_ID_KEY, organizationId);
      setOrganizationId(organizationId);
    }
  };
  const exitOrganization = () => {
    if (typeof window !== undefined) {
      localStorage.removeItem(ORGANIZATION_ID_KEY);
      setOrganizationId(undefined);
      router.push("/auth/organizations");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem(TOKEN_KEY);
      const localOrganizationId = localStorage.getItem(ORGANIZATION_ID_KEY);
      if (!!localOrganizationId) {
        setOrganizationId(localOrganizationId);
      }
      if (!!localToken) {
        setToken(localToken);
      }
      if (!!localOrganizationId && !!localToken) {
        if (router.pathname.startsWith("/auth")) {
          router.push("/");
        }
      }
      if (!localToken && !localOrganizationId) {
        if (
          !router.pathname.startsWith("/auth") ||
          router.pathname.startsWith("/auth/organizations")
        ) {
          router.push("/auth/sign_in");
        }
      }
      if (!!localToken && !localOrganizationId) {
        if (!router.pathname.startsWith("/auth/organizations")) {
          router.push("/auth/organizations");
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        setAuthToken,
        signOut,
        organizationId,
        selectOrganization,
        exitOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
