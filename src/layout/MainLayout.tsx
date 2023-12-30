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
        <SideNav />
        <div className="px-2 py-3">{children}</div>
      </div>
    );
  }
};

export default MainLayout;
