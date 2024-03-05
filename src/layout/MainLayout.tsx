import { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import { HomeIcon, Newspaper, UserIcon } from "lucide-react";
import { Button, buttonVariants } from "../components/shadcn/Button";
import { cn } from "../utilities/cn";
import Link from "next/link";
import EmpleoLogo from "../components/EmpleoLogo";
import { useRouter } from "next/router";

import SearchDialog from "../components/other/SearchDialog";
import SettingsDropdown from "../components/other/SettingsDropdown";
import useGetCurrentOrganization from "../requests/organizations/useGetCurrentOrganization";

interface MainLayoutProps {
  children: ReactNode;
  layout: "auth" | "normal";
}

const SIDE_NAV_ITEMS = [
  {
    name: "Organization",
    href: "/organization",
    icon: HomeIcon,
  },
  {
    name: "Team",
    href: "/team",
    icon: UserIcon,
  },
  {
    name: "Listings",
    href: "/listings",
    icon: Newspaper,
  },
];

const MainLayout = ({ children, layout = "normal" }: MainLayoutProps) => {
  const { pathname } = useRouter();
  const { data: organization } = useGetCurrentOrganization();

  if (layout === "auth") return <AuthLayout>{children}</AuthLayout>;
  else {
    return (
      <div className="max-w-[1500px] mx-auto">
        <div className="mx-5">
          <div className="flex w-full max-w-[1500px] fixed z-10 h-[55px] bg-background">
            <div>
              <Link href="/">
                <div className="w-[180px] px-5 py-1 ml-2 mr-5">
                  <EmpleoLogo background="dark" className="hidden dark:block" />
                  <EmpleoLogo background="light" className="dark:hidden" />
                </div>
              </Link>
            </div>
            <div className="pr-2 py-1 flex justify-end items-center gap-x-1 w-full mr-7">
              <Link
                href="/organization"
                className={
                  "text-sm font-medium hover:bg-gray-50 rounded-md border px-2 py-0.5"
                }
              >
                {organization?.title || "Organization"}
              </Link>
              <SearchDialog />
              <SettingsDropdown />
            </div>
          </div>
          <div className="flex">
            <div className="w-[180px] mt-[55px] bg-gray-200/30 dark:bg-gray-600/10 rounded-lg h-min fixed">
              <div className=" ml-2 mr-2 py-3 flex flex-col gap-y-1">
                {SIDE_NAV_ITEMS.map((item) => (
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      " flex items-center gap-1 justify-start !h-7 hover:bg-gray-200 dark:hover:bg-gray-800/70",
                      pathname.startsWith(item.href) &&
                        "text-indigo-500 font-semibold hover:text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-950/80"
                    )}
                    key={item.name}
                  >
                    <item.icon className="h-4 w-4" /> {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pl-5 pt-1 pb-10 w-full ml-[180px] mt-[55px] overflow-y-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MainLayout;
