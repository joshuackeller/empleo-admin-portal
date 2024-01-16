import { ReactNode } from "react";
import SideNav from "./SideNav";
import AuthLayout from "./AuthLayout";

interface MainLayoutProps {
  children: ReactNode;
  layout: "auth" | "normal";
}

const MainLayout = ({ children, layout = "normal" }: MainLayoutProps) => {
  if (layout === "auth") return <AuthLayout>{children}</AuthLayout>;
  else {
    return (
      <div className={"flex"}>
        <SideNav className="h-[100vh] fixed overflow-y-auto w-[170px] " />
        <div className="ml-[170px] px-2 py-3 w-full h-full flex-1">
          {children}
        </div>
      </div>
    );
  }
};

export default MainLayout;
