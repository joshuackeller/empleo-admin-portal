import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/src/components/shadcn/DropdownMenu";
import useExitOrganization from "@/src/requests/auth/useExitOrganization";
import useSignOut from "@/src/requests/auth/useSignOut";
import { ArrowLeftRight, Link, LogOutIcon, SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

const SettingsDropdown = () => {
  const { mutate: signOut } = useSignOut();
  const { mutate: exitOrganization } = useExitOrganization();

  const router = useRouter();

  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-1.5">
        <SettingsIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={() => {
              router.push("/settings");
            }}
            className="cursor-pointer"
          >
            Account Details
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="dark:hidden mr-1">Light</span>
            <span className="hidden dark:block mr-1">Dark</span>Mode
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onSelect={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => exitOrganization()}
          className="justify-between cursor-pointer"
        >
          Switch Org
          <ArrowLeftRight className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="flex justify-between cursor-pointer"
        >
          Log out <LogOutIcon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
