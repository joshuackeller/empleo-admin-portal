import { buttonVariants } from "@/src/components/shadcn/Button";
import { Separator } from "@/src/components/shadcn/Separator";
import { cn } from "@/src/utilities/cn";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface OrganizationWrapperProps {
  children: ReactNode;
}

const OrganizationWrapper = ({ children }: OrganizationWrapperProps) => {
  const { pathname } = useRouter();
  return (
    <div>
      <h4>Select Layout</h4>
      <div className="flex items-center gap-x-5 my-2">
        <Link
          href="/organization/layout"
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === "/organization/layout" && "text-primary",
          )}
        >
          Layout 1
        </Link>
        <Link
          href="/organization/layout_2"
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === "/organization/layout_2" && "text-primary",
          )}
        >
          Layout 2
        </Link>
        <Link
            href="/organization/layout_3"
            className={cn(
                `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
                pathname === "/organization/layout_3" && "text-primary",
            )}
            >
            Layout 3
        </Link>
      </div>
      <Separator className="mb-2 mt-1" />
      {children}
    </div>
  );
};

export default OrganizationWrapper;
