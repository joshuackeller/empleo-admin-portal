import { ReactNode } from "react";
import SideNav from "./SideNav";
import AuthLayout from "./AuthLayout";
import {
  ArrowLeftRight,
  BackpackIcon,
  HomeIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { Button, buttonVariants } from "../components/shadcn/Button";
import { cn } from "../utilities/cn";
import Link from "next/link";
import EmpleoLogo from "../components/EmpleoLogo";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/DropdownMenu";
import { Input } from "../components/shadcn/Input";
import useSignOut from "../requests/auth/useSignOut";
import useExitOrganization from "../requests/auth/useExitOrganization";

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
    icon: BackpackIcon,
  },
];

const MainLayout = ({ children, layout = "normal" }: MainLayoutProps) => {
  const { pathname } = useRouter();

  if (layout === "auth") return <AuthLayout>{children}</AuthLayout>;
  else {
    return (
      <div className="max-w-[1500px] mx-auto">
        <div className="mx-2">
          <div className="flex w-full max-w-[1500px] fixed z-10 h-[55px] bg-white">
            <div>
              <div className="w-[200px] px-5 py-1 ml-2 mr-5">
                <EmpleoLogo background="light" />
              </div>
            </div>
            <div className="pr-2 py-1 flex justify-end w-full">
              <SettingsDropdown />
            </div>
          </div>
          <div className="flex">
            <div className="w-[200px] mt-[55px] bg-gradient-to-r bg-gray-50 rounded-lg h-min fixed">
              <div className=" ml-2 mr-5 py-3 flex flex-col gap-y-1">
                {SIDE_NAV_ITEMS.map((item) => (
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      " flex items-center gap-1 justify-start !h-7 hover:bg-gray-200",
                      pathname.startsWith(item.href) &&
                        "text-indigo-500 hover:text-indigo-500 hover:bg-indigo-100"
                    )}
                    key={item.name}
                  >
                    <item.icon className="h-4 w-4" /> {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pl-5 pt-1 pb-10 w-full ml-[200px] mt-[55px] overflow-y-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MainLayout;

const SettingsDropdown = () => {
  const { mutate: signOut } = useSignOut();
  const { mutate: exitOrganization } = useExitOrganization();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">Account Details</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => exitOrganization()}
          className="justify-between"
        >
          Switch Org
          <ArrowLeftRight className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex justify-between"
        >
          Log out <LogOutIcon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
