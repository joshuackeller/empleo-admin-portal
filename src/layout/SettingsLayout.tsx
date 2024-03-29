import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import useSignOut from "@/src/requests/auth/useSignOut";
import useExitOrganization from "@/src/requests/auth/useExitOrganization";
import { Separator } from "@/src/components/shadcn/Separator";
import Link from "next/link";
import { cn } from "@/src/utilities/cn";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { ExitIcon, ResetIcon } from "@radix-ui/react-icons";

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const { pathname } = useRouter();

  const { mutate: signOut } = useSignOut();
  const { mutate: exitOrganization } = useExitOrganization();

  return (
    <div>
      <div className="w-full flex flex-col justify-between fixed bg-white h-[40px]">
        <h3>Settings</h3>
        <Separator />
      </div>

      <div className="flex py-2 pr-2 pt-[50px]">
        <div className="flex flex-col justify-between fixed h-[calc(100vh-70px)] w-[150px]">
          <div className="flex flex-col gap-y-1">
            <Link
              href="/settings/my_account"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === "/settings"
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              My Account
            </Link>
          </div>
          <div className="flex flex-col gap-y-1 ">
            <Button
              variant="secondary"
              onClick={() => signOut()}
              className="gap-1 justify-between"
            >
              Sign Out
              <ExitIcon />
            </Button>

            <Button
              variant="secondary"
              onClick={() => exitOrganization()}
              className="gap-1 justify-between"
            >
              Switch Org
              <ResetIcon />
            </Button>
          </div>
        </div>
        <div className="px-5 py-1 flex-1 ml-[150px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
