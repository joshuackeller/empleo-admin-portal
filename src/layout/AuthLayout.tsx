import EmpleoLogo from "@/src/components/EmpleoLogo";
import { ReactNode } from "react";

interface AuthLayout {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayout) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden md:block w-1/2 p-5 bg-indigo-950 h-full">
          <div className="hidden md:block">
            <EmpleoLogo size="lg" />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          {children}
        </div>
      </div>
      <div className="md:hidden block absolute top-5 left-5">
        <EmpleoLogo size="lg" lightBackground />
      </div>
    </>
  );
};

export default AuthLayout;
